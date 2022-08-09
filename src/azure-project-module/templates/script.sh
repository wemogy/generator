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
  read -p "WARNING: You are logged in as $user but this script should only be executed as it@wemogy.com. Are you sure you want to continue? [y/N]" -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]
  then
      exit 1
  fi
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
devGroup=$(az ad group create \
  --display-name "wemogy $moduleName Developers" \
  --mail-nickname "wemogy-$moduleName-developers")
devGroupName=$(echo $devGroup | jq -r .displayName)
devGroupObjectId=$(echo $devGroup | jq -r .objectId)

sleep 10

az role assignment create \
  --assignee $devGroupObjectId \
  --role "Owner" \
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
  --group "$devGroupName" \
  --member-id $(az ad sp show --id $localDevAppId --query objectId -o tsv)

# Create Service for GitHub Actions
echo "Creating Service Principal for GitHub Actions..."

gitHubActionsServicePrincipal=$(az ad sp create-for-rbac \
  --name "wemogy $moduleName GitHub Actions" \
  --role owner)
gitHubActionsAppId=$(echo $gitHubActionsServicePrincipal | jq -r .appId)
gitHubActionsTenantId=$(echo $gitHubActionsServicePrincipal | jq -r .tenant)
gitHubActionsPassword=$(echo $gitHubActionsServicePrincipal | jq -r .password)

# Add the service principal to the aad group
az ad group member add \
  --group "$devGroupObjectId" \
  --member-id $(az ad sp show --id $gitHubActionsAppId --query objectId -o tsv)

# ---------
# Terraform
# ---------

echo "Creating Terraform Remote State resources..."

storageAccountName=wemogy${moduleName}tfstate

az storage account create \
  --name $storageAccountName \
  --resource-group $moduleName \
  --location $location \
  --kind StorageV2

sleep 10

az storage container create \
  --name tfstate \
  --account-name $storageAccountName

terraformAccessKey=$(az storage account keys list \
  --account-name wemogy${moduleName}tfstate \
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

# Give Developers AAD Group access
az keyvault set-policy \
  --name "wemogy${moduleName}kv" \
  --resource-group "$moduleName" \
  --object-id $devGroupObjectId \
  --secret-permissions all

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

az keyvault secret set \
  --vault-name "wemogy${moduleName}kv" \
  --name "TerraformBackendAccessKey" \
  --value "$terraformAccessKey"

# --------------
# GitHub Secrets
# --------------

if [ "$addGitHubSecrets" = true ]; then
  echo "Adding Secrets to GitHub Repository..."
  gh secret set AZURE_APP_ID -b "$(echo $gitHubActionsServicePrincipal | jq -r .appId)"
  gh secret set AZURE_PASSWORD -b "$(echo $gitHubActionsServicePrincipal | jq -r .password)"
  gh secret set AZURE_TENANT_ID -b "$(echo $gitHubActionsServicePrincipal | jq -r .tenant)"
  gh secret set TERRAFORM_BACKEND_ACCESS_KEY -b "$(echo $terraformAccessKey)"
else
  echo "Please add the following secrets to GitHub Repository:"
  echo "gh secret set AZURE_APP_ID -b <SECRET>"
  echo "gh secret set AZURE_PASSWORD -b <SECRET>"
  echo "gh secret set AZURE_TENANT_ID -b <SECRET>"
  echo "gh secret set TERRAFORM_BACKEND_ACCESS_KEY -b <SECRET>"
fi
