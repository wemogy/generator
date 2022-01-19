projectName=$1
subscription=$2
location=$3
addGitHubSecrets=$4

echo 'This script expects that, you have the following tools available in your $PATH: az, jq, gh'

echo "Project name: $projectName"
echo "Subscription ID: $subscription"
echo "Location: $location"
echo "Add GitHub Secrets: $addGitHubSecrets"

az account set --subscription $subscription

# ---------
# AAD Group
# ---------

echo "Creating an AAD group for Developers..."

# Create new AD Group for Developers
group=$(az ad group create \
  --display-name "$projectName Developers" \
  --mail-nickname "$projectName-developers")
groupName=$(echo $group | jq -r .name)

az role assignment create \
  --assignee $(echo $group | jq -r .objectId) \
  --role "Contributor" \
  --scope "/subscriptions/$subscription"

# Add current user to the group
az ad group member add \
  --group $groupName \
  --member-id $(az ad signed-in-user show --query objectId -o tsv)

# ------------------
# Service Principals
# ------------------

# Create Service Principal for local development
echo "Creating Service Principal for Local Development..."
localDevAppId=$(az ad sp create-for-rbac \
  --name "$projectName Local Development" \
  --skip-assignment \
  --query appId \
  --output tsv)

# Add the service principal to the developers group
az ad group member add \
  --group $groupName \
  --member-id $(az ad sp show --id $localDevAppId --query objectId -o tsv)

# Create Service for GitHub Actions
echo "Creating Service Principal for GitHub Actions..."
gitHubActions=$(az ad sp create-for-rbac \
  --name "Customer-A Project-B GitHub Actions" \
  --role contributor)

if [ "$addGitHubSecrets" = true ]; then
  echo "Adding Secrets to GitHub Repository..."
  gh secret set AZURE_APP_ID -b $(echo $gitHubActions | jq -r .appId)
  gh secret set AZURE_PASSWORD -b $(echo $gitHubActions | jq -r .password)
  gh secret set AZURE_TENANT_ID -b $(echo $gitHubActions | jq -r .tenant)
else
  echo "Please add the following secrets to GitHub Repository:"
  echo "gh secret set AZURE_APP_ID -b $(echo $gitHubActions | jq -r .appId)"
  echo "gh secret set AZURE_PASSWORD -b $(echo $gitHubActions | jq -r .password)"
  echo "gh secret set AZURE_TENANT_ID -b $(echo $gitHubActions | jq -r .tenant)"
fi

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

az storage container create \
  --name tfstate \
  --account-name ${projectName}tfstate
