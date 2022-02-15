projectName=$1
subscription=$2
location=$3
addGitHubSecrets=$4

echo 'This script expects that, you have the following tools available in your $PATH: az, jq, gh'

echo "Project name: $projectName"
echo "Subscription ID: $subscription"
echo "Location: $location"
echo "Add GitHub Secrets: $addGitHubSecrets"

# Make sure that the script is exected as it@wemogy.com admin account
user=$(az account show --query user.name -o tsv)
if [ "$user" != "it@wemogy.com" ]; then
  echo "ERROR: This script must be executed as it@wemogy.com. Please login with that account by running 'az login' and try again."
  exit 1
fi

az account set --subscription $subscription

# ---------
# AAD Group
# ---------

echo "Creating an AAD group for Developers..."

# Create new AD Group for Developers
group=$(az ad group create \
  --display-name "$projectName Developers" \
  --mail-nickname "$projectName-developers")

groupName=$(echo $group | jq -r .displayName)
groupObjectId=$(echo $group | jq -r .objectId)

sleep 10

az role assignment create \
  --assignee $groupObjectId \
  --role "Reader" \
  --scope "/subscriptions/$subscription"

# ------------------
# Service Principals
# ------------------

# Create Service Principal for local development
echo "Creating Service Principal for Local Development..."

localDevServicePrincipal=$(az ad sp create-for-rbac \
  --name "$projectName Local Development" \
  --skip-assignment)

localDevAppId=$(echo $localDevServicePrincipal | jq -r .appId)
localDevTenantId=$(echo $localDevServicePrincipal | jq -r .tenant)
localDevPassword=$(echo $localDevServicePrincipal | jq -r .password)

# Add the service principal to the developers group
az ad group member add \
  --group $groupName \
  --member-id $(az ad sp show --id $localDevAppId --query objectId -o tsv)

# Create Service for GitHub Actions
echo "Creating Service Principal for GitHub Actions..."
gitHubActions=$(az ad sp create-for-rbac \
  --name "$projectName GitHub Actions" \
  --role contributor)

# ---------
# Terraform
# ---------

echo "Creating Terraform Remote State resources..."

az group create --name terraform --location $location

az storage account create \
  --name ${projectName}tfstate \
  --resource-group terraform \
  --location $location \
  --kind StorageV2

sleep 10

az storage container create \
  --name tfstate \
  --account-name ${projectName}tfstate

az storage container create \
  --name tfstate-dev \
  --account-name ${projectName}tfstate

sleep 10

terraformDevSasToken=$(az storage container generate-sas \
  --name tfstate-dev \
  --account-name ${projectName}tfstate \
  --permissions acdlrw \
  --expiry 2030-01-01)

terraformAccessKey=$(az storage account keys list \
  --account-name ${projectName}tfstate \
  -o tsv \
  --query "[0].value")

# ---------------------
# Development Key Vault
# ---------------------

echo "Creating Development Key Vault..."

# Create Development Resource Group
az group create \
  --name "general" \
  --location $location

# Create Azure Key Vault for Developer Secrets
az keyvault create \
  --name "${projectName}devvault" \
  --resource-group "general" \
  --location $location

# Give Developers AAD Group read-access
az keyvault set-policy \
  --name "${projectName}devvault" \
  --resource-group "general" \
  --object-id $groupObjectId \
  --secret-permissions get list

# Add Local Development Service Principal Secrets
az keyvault secret set \
  --vault-name "${projectName}devvault" \
  --name "LocalDevServicePrincipalAppId" \
  --value "$localDevAppId"

az keyvault secret set \
  --vault-name "${projectName}devvault" \
  --name "LocalDevServicePrincipalTenantId" \
  --value "$localDevTenantId"

az keyvault secret set \
  --vault-name "${projectName}devvault" \
  --name "LocalDevServicePrincipalPassword" \
  --value "$localDevPassword"

# Add Terraform Dev State Saas Token
az keyvault secret set \
  --vault-name "${projectName}devvault" \
  --name "TerraformDevBackendSasToken" \
  --value "$terraformDevSasToken"

# --------------
# GitHub Secrets
# --------------

if [ "$addGitHubSecrets" = true ]; then
  echo "Adding Secrets to GitHub Repository..."
  gh secret set AZURE_APP_ID -b $(echo $gitHubActions | jq -r .appId)
  gh secret set AZURE_PASSWORD -b $(echo $gitHubActions | jq -r .password)
  gh secret set AZURE_TENANT_ID -b $(echo $gitHubActions | jq -r .tenant)
  gh secret set TERRAFORM_BACKEND_ACCESS_KEY -b $(echo $terraformAccessKey)
else
  echo "Please add the following secrets to GitHub Repository:"
  echo "gh secret set AZURE_APP_ID -b <SECRET>"
  echo "gh secret set AZURE_PASSWORD -b <SECRET>"
  echo "gh secret set AZURE_TENANT_ID -b <SECRET>"
  echo "gh secret set TERRAFORM_BACKEND_ACCESS_KEY -b <SECRET>"
fi
