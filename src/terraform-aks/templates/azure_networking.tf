<% if (publicIp) { %>resource "azurerm_public_ip" "<%- id %>" {
  name                = <%- publicIpName %>
  location            = <%- location %>
  resource_group_name = <%- resourceGroupName %>
  allocation_method   = "Static"
  sku                 = "Standard"
}<% } %>

resource "azurerm_virtual_network" "<%- id %>" {
  name                = <%- vnetName %>
  location            = <%- location %>
  resource_group_name = <%- resourceGroupName %>
  address_space       = ["10.0.0.0/8"]
}

resource "azurerm_subnet" "aks" {
  name                 = "aks"
  virtual_network_name = azurerm_virtual_network.<%- id %>.name
  resource_group_name  = <%- resourceGroupName %>
  address_prefixes     = ["10.240.0.0/16"]
}
