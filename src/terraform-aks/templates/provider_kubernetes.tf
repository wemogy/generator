provider "kubernetes" {
  host                   = azurerm_kubernetes_cluster.default.kube_admin_config.0.host
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.cluster_ca_certificate)
  client_certificate     = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.client_certificate)
  client_key             = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.client_key)
}

provider "helm" {
  kubernetes {
    host                   = azurerm_kubernetes_cluster.default.kube_admin_config.0.host
    cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.cluster_ca_certificate)
    client_certificate     = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.client_certificate)
    client_key             = base64decode(azurerm_kubernetes_cluster.default.kube_admin_config.0.client_key)
  }
}
