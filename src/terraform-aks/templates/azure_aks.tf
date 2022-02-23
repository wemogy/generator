resource "azurerm_kubernetes_cluster" "default" {
  name                = "${var.prefix}aks"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  dns_prefix          = "${var.prefix}aks"
  kubernetes_version  = "<%- kubernetesVersion %>"

  default_node_pool {
    name                         = "system"
    vm_size                      = "Standard_B2s"
    node_count                   = 1
    vnet_subnet_id               = azurerm_subnet.aks.id
    only_critical_addons_enabled = true
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      default_node_pool[0].node_count,
    ]
  }
}

resource "azurerm_kubernetes_cluster_node_pool" "default_worker" {
  name                  = "worker"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.default.id
  vm_size               = "Standard_DS2_v2"
  node_count            = 1
  vnet_subnet_id        = azurerm_subnet.aks.id
}
