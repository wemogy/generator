resource "helm_release" "nginx" {
  name             = "nginx"
  namespace        = "ingress-system"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "nginx-ingress"
  version          = "4.0.16"
  create_namespace = true

  set {
    name  = "controller.replicaCount"
    value = "2"
  }

  set {
    name  = "controller.nodeSelector.beta\\.kubernetes\\.io/os"
    value = "linux"
    type  = "string"
  }

  set {
    name  = "defaultBackend.nodeSelector.beta\\.kubernetes\\.io/os"
    value = "linux"
    type  = "string"
  }

  set {
    name  = "controller.service.loadBalancerIP"
    value = azurerm_public_ip.aks_ingress.ip_address
  }

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io\\/azure-load-balancer-resource-group"
    value = azurerm_resource_group.default.name
    type  = "string"
  }
}
