moduleName=$1
subscription=$2
location=$3
addGitHubSecrets=$4

echo 'This script expects that, you have the following tools available in your $PATH: az, jq, gh'

echo "Module name: $moduleName"
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
  --display-name "wemogy $moduleName Developers" \
  --mail-nickname "wemogy-$moduleName-developers")
groupName=$(echo $group | jq -r .name)

az role assignment create \
  --assignee $(echo $group | jq -r .objectId) \
  --role "Contributor" \
  --scope "/subscriptions/$subscription"

# ------------------
# Service Principals
# ------------------

# Create Service Principal for local development
echo "Creating Service Principal for Local Development..."
localDevAppId=$(az ad sp create-for-rbac \
  --name "wemogy $moduleName Local Development" \
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
