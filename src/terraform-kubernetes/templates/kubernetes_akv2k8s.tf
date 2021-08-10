resource "helm_release" "akv2k8s" {
  name             = "akv2k8s"
  namespace        = "akv2k8s"
  repository       = "http://charts.spvapi.no"
  chart            = "akv2k8s"
  version          = "1.1.25"
  create_namespace = true
}
