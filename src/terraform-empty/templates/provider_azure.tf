provider "azurerm" {
  features {}
<% if (azureSubscription) { %>
  subscription_id = "0dce37d2-715f-42a8-8297-7b3b30382521"
  tenant_id       = "366f0c02-d569-4dae-a693-34d9262182ea"
<% } %>
}

data "azurerm_client_config" "current" {}
