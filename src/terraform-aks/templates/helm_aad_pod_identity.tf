resource "helm_release" "aad_pod_identity" {
  name       = "aad-pod-identity-system"
  repository = "https://raw.githubusercontent.com/Azure/aad-pod-identity/master/charts"
  chart      = "aad-pod-identity"
  version    = "4.1.4"
}
