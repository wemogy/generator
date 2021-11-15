#!/bin/bash
appId=$(az keyvault secret show --vault-name <%= keyVaultName %> --name LocalDevelopmentAppId --query value -o tsv)
tenantId=$(az keyvault secret show --vault-name <%= keyVaultName %> --name LocalDevelopmentTenantId --query value -o tsv)
password=$(az keyvault secret show --vault-name <%= keyVaultName %> --name LocalDevelopmentPassword --query value -o tsv)

jq \
  --arg key0 "LocalDevelopmentAppId" \
  --arg value0 $appId \
  --arg key1 "LocalDevelopmentTenantId" \
  --arg value1 $tenantId \
  --arg key2 "LocalDevelopmentPassword" \
  --arg value2 $password \
  '. | .[$key0]=$value0 | .[$key1]=$value1 | .[$key2]=$value2' \
  <<<'{}' \
  > ../dapr/secrets/secrets.json
