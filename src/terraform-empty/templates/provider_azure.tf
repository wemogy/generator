provider "azurerm" {
  features {}
  subscription_id = "<%= azureSubscriptionId %>"
  tenant_id       = "<%= azureTenantId %>"
}

data "azurerm_client_config" "current" {}
