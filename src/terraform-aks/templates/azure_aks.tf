resource "azurerm_kubernetes_cluster" "default" {
  name                      = "${local.prefix}aks"
  location                  = azurerm_resource_group.default.location
  resource_group_name       = azurerm_resource_group.default.name
  dns_prefix                = "${local.prefix}aks"
  kubernetes_version        = var.kubernetes_version  
  sku_tier                  = "Standard"
  automatic_channel_upgrade = "stable"
  node_os_channel_upgrade   = "Unmanaged"

  # Upgrade the cluster every first Sunday of a month at 1:00 am UTC for 8 hours
  maintenance_window_auto_upgrade {
    frequency   = "RelativeMonthly"
    interval    = 1
    day_of_week = "Sunday"
    week_index  = "First"
    duration    = 8
    start_time  = "01:00"
  }

  # Upgrade the Node OS image every first Sunday of a month at 1:00 am UTC for 8 hours
  maintenance_window_node_os {
    frequency   = "RelativeMonthly"
    interval    = 1
    day_of_week = "Sunday"
    week_index  = "First"
    duration    = 8
    start_time  = "01:00"
  }

  default_node_pool {
    name                         = "system"
    orchestrator_version         = var.kubernetes_version
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

  azure_active_directory_role_based_access_control {
    managed                = true
    tenant_id              = data.azurerm_client_config.current.tenant_id
    admin_group_object_ids = [var.azure_aad_group_admins_id]
    azure_rbac_enabled     = false
  }

  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.default.id
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes = [
      default_node_pool[0].node_count,
      kubernetes_version
    ]
  }
}

resource "azurerm_kubernetes_cluster_node_pool" "default_worker" {
  name                  = "worker"
  orchestrator_version  = var.kubernetes_version
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
