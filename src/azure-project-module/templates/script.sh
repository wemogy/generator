moduleName=$1
subscription=$2
location=$3
addGitHubSecrets=$4

echo 'This script expects that, you have the following tools available in your $PATH: az, jq, gh'

echo "Module name: $moduleName"
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

# --------------
# Resource Group
# --------------

echo "Creating Resource Group for Module..."

# Create Resource Group for Module
az group create \
  --name "$moduleName" \
  --location $location

# ---------
# AAD Group
# ---------

echo "Creating an AAD group for Developers..."

# Create new AD Group for Developers
group=$(az ad group create \
  --display-name "wemogy $moduleName Developers" \
  --mail-nickname "wemogy-$moduleName-developers")

groupName=$(echo $group | jq -r .displayName)
groupObjectId=$(echo $group | jq -r .objectId)

sleep 10

az role assignment create \
  --assignee $groupObjectId \
  --role "Contributor" \
  --scope "/subscriptions/$subscription/resourceGroups/$moduleName"

# ------------------
# Service Principals
# ------------------

echo "Creating Service Principal for Local Development..."

# Create Service Principal for local development
localDevServicePrincipal=$(az ad sp create-for-rbac \
  --name "wemogy $moduleName Local Development" \
  --skip-assignment)

localDevAppId=$(echo $localDevServicePrincipal | jq -r .appId)
localDevTenantId=$(echo $localDevServicePrincipal | jq -r .tenant)
localDevPassword=$(echo $localDevServicePrincipal | jq -r .password)

# Add the service principal to the developers group
az ad group member add \
  --group "$groupName" \
  --member-id $(az ad sp show --id $localDevAppId --query objectId -o tsv)

# Create Service for GitHub Actions
echo "Creating Service Principal for GitHub Actions..."

gitHubActions=$(az ad sp create-for-rbac \
  --name "wemogy $moduleName GitHub Actions" \
  --skip-assignment)

gitHubActionsAppId=$(echo $gitHubActions | jq -r .appId)

# Add the service principal to the developers group
az ad group member add \
  --group "$groupName" \
  --member-id $(az ad sp show --id $gitHubActionsAppId --query objectId -o tsv)

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

terraformAccessKey=$(az storage account keys list \
  --account-name ${projectName}tfstate \
  -o tsv \
  --query "[0].value")

# ---------------------
# Development Key Vault
# ---------------------

echo "Creating Development Key Vault..."

# Create Azure Key Vault for Developer Secrets
az keyvault create \
  --name "wemogy${moduleName}kv" \
  --resource-group "$moduleName" \
  --location $location

# Give Developers AAD Group read-access
az keyvault set-policy \
  --name "wemogy${moduleName}kv" \
  --resource-group "$moduleName" \
  --object-id $groupObjectId \
  --secret-permissions get list

# Add Local Development Service Principal Secrets
az keyvault secret set \
  --vault-name "wemogy${moduleName}kv" \
  --name "LocalDevServicePrincipalAppId" \
  --value "$localDevAppId"

az keyvault secret set \
  --vault-name "wemogy${moduleName}kv" \
  --name "LocalDevServicePrincipalTenantId" \
  --value "$localDevTenantId"

az keyvault secret set \
  --vault-name "wemogy${moduleName}kv" \
  --name "LocalDevServicePrincipalPassword" \
  --value "$localDevPassword"

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
