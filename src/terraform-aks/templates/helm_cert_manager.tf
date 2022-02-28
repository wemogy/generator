resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  namespace        = "cert-manager-system"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "v1.7.1"
  create_namespace = true

  set {
    name  = "installCRDs"
    value = "true"
  }
}
