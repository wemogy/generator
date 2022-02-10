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
    value = <%= ingressLoadBalancerIp %>
  }

  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io\\/azure-load-balancer-resource-group"
    value = <%= ingressLoadBalancerIpResourceGroup %>
    type  = "string"
  }
}
