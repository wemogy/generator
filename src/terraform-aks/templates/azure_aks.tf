resource "azurerm_kubernetes_cluster" "default" {
  name                = "${var.prefix}aks"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  dns_prefix          = "${var.prefix}aks"
  kubernetes_version  = "<%- kubernetesVersion %>"

  default_node_pool {
    name                         = "system"
    vm_size                      = "Standard_B2s"
    vnet_subnet_id               = azurerm_subnet.aks.id
    only_critical_addons_enabled = true
    enable_auto_scaling          = true
    min_count                    = 1
    max_count                    = 3
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
  }

  role_based_access_control {
    enabled = true

    azure_active_directory {
      managed                = true
      admin_group_object_ids = [var.azure_aad_group_admins_id]
      azure_rbac_enabled     = true
    }
  }

  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.default.id
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
  vnet_subnet_id        = azurerm_subnet.aks.id
  enable_auto_scaling   = true
  min_count             = 0
  max_count             = 10

  lifecycle {
    ignore_changes = [
      node_count
    ]
  }
}
