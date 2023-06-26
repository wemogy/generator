# Needed for service allocation of static IP address outside of the node's resource group
resource "azurerm_role_assignment" "aks_network_contributor" {
  scope                = azurerm_resource_group.default.id
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.default.identity[0].principal_id
}

# Needed to assign AAD Pod Identity to AKS nodes
resource "azurerm_role_assignment" "aks_vm_contributor" {
  scope                = "/subscriptions/${data.azurerm_client_config.current.subscription_id}/resourcegroups/${azurerm_kubernetes_cluster.default.node_resource_group}"
  role_definition_name = "Virtual Machine Contributor"
  principal_id         = azurerm_kubernetes_cluster.default.kubelet_identity[0].object_id
}

# Allow Developers to log into the AKS cluster
resource "azurerm_role_assignment" "aks_dev_login" {
  scope                = azurerm_kubernetes_cluster.default.id
  role_definition_name = "Azure Kubernetes Service Cluster User Role"
  principal_id         = var.azure_aad_group_developers_id
}
