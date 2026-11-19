resource "helm_release" "nginx" {
  name             = "nginx"
  namespace        = "ingress-system"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "4.5.2"
  create_namespace = true

  # Mitigation for NGINX2Root (CVE-2026-123007, CVE-2026-123633): the bundled nginx is
  # vulnerable and ingress-nginx is archived, so no patched controller will be released.
  # Disabling HTTP/2 closes the HTTP/2 attack path until the ingress controller is replaced.
  set {
    name  = "controller.config.use-http2"
    value = "false"
    type  = "string"
  }

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

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io\\/azure-load-balancer-health-probe-request-path"
    value = "/healthz"
    type  = "string"
  }
}
