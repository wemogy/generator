#!/bin/bash
echo "Please make sure, to have the following tools installed: az, jq"

keyVaultName=<%= keyVaultName %>

# Get secrets from Azure Key Vault
localDevServicePrincipalAppId=$(az keyvault secret show --vault-name $keyVaultName --name LocalDevServicePrincipalAppId --query value -o tsv)
localDevServicePrincipalTenantId=$(az keyvault secret show --vault-name $keyVaultName --name LocalDevServicePrincipalTenantId --query value -o tsv)
localDevServicePrincipalPassword=$(az keyvault secret show --vault-name $keyVaultName --name LocalDevServicePrincipalPassword --query value -o tsv)

# Create secrets folder for Dapr
mkdir ../dapr/secrets/

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
  > ../dapr/secrets/secrets.json
