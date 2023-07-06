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

resource "kubernetes_cluster_role" "node_reader" {
  metadata {
    name = "node-reader"
  }

  rule {
    api_groups = [""]
    resources  = ["nodes"]
    verbs      = ["get", "watch", "list"]
  }
}
