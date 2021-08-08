# Needed for service allocation of static IP address outside of the node's resource group
resource "azurerm_role_assignment" "aks_network_contributor" {
  scope                = <%- resourceGroupId %>
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.<%- id %>.identity[0].principal_id
}
