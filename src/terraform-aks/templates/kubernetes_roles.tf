resource "kubernetes_cluster_role" "port_forwarder" {
  metadata {
    name = "port-forwarder"
  }

  rule {
    api_groups = ["*"]
    resources  = ["pods/portforward"]
    verbs      = ["*"]
  }
}
