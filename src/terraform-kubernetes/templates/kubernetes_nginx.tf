resource "helm_release" "nginx_ingress" {
  name             = "nginx-ingress"
  namespace        = "ingress-system"
  repository       = "https://charts.helm.sh/stable"
  chart            = "nginx-ingress"
  version          = "1.33.5"
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
    value = <%- ingressIp %>
  }

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io\\/azure-load-balancer-resource-group"
    value = <%- ingressIpResourceGroupName %>
    type  = "string"
  }
}
