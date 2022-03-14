#!/bin/bash
echo 'INFO: Make sure, you run this script with the `source` command to set environment variables. Example: `source secrets.sh`'
echo 'INFO: Please make sure, to have the following tools installed: az, jq'

# Configuration
keyVaultName=<%= keyVaultName %>
subscriptionId=<%= subscriptionId %>

# Get absolute path for script and calculate path for output file
scriptPath="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
parentDir="$(dirname "$scriptPath")"
daprSecretsFolder="$(cd $parentDir/../env/dapr/secrets ; pwd)"

##################
# Terraform      #
##################

export ARM_SAS_TOKEN=$(az keyvault secret show --subscription $subscriptionId --vault-name $keyVaultName -n <%= terraformSecretName %> -o tsv --query value)

##################
# Dapr Secrets   #
##################

# Get secrets from Azure Key Vault
localDevServicePrincipalAppId=$(az keyvault secret show --subscription $subscriptionId --vault-name $keyVaultName --name LocalDevServicePrincipalAppId --query value -o tsv)
localDevServicePrincipalTenantId=$(az keyvault secret show --subscription $subscriptionId --vault-name $keyVaultName --name LocalDevServicePrincipalTenantId --query value -o tsv)
localDevServicePrincipalPassword=$(az keyvault secret show --subscription $subscriptionId --vault-name $keyVaultName --name LocalDevServicePrincipalPassword --query value -o tsv)

# Create secrets folder for Dapr
mkdir $daprSecretsFolder

# Generate JSON file out of Key Vault secrets
jq \
  --arg key0 "LocalDevServicePrincipalAppId" \
  --arg value0 $localDevServicePrincipalAppId \
  --arg key1 "LocalDevServicePrincipalTenantId" \
  --arg value1 $localDevServicePrincipalTenantId \
  --arg key2 "LocalDevServicePrincipalPassword" \
  --arg value2 $localDevServicePrincipalPassword \
  '. | .[$key0]=$value0 | .[$key1]=$value1 | .[$key2]=$value2' \
  <<<'{}' \
  > $daprSecretsFolder/secrets.json
