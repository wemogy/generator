# Give developers view access to the whole cluster by assinging the defult role "view"
# This does not include access to secrets
resource "kubernetes_cluster_role_binding" "developer_view" {
  metadata {
    name = "developer-view"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "view"
  }

  subject {
    kind = "Group"
    name = var.azure_aad_group_developers_id
  }
}

# Give developers view access to the noes
resource "kubernetes_cluster_role_binding" "developer_node_reader" {
  metadata {
    name = "${var.project}-developer-node-reader"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "node-reader"
  }

  subject {
    kind = "Group"
    name = var.azure_aad_group_developers_id
  }
}

# Give developers port-forward access to the whole cluster
resource "kubernetes_cluster_role_binding" "developer_port_forwarder" {
  metadata {
    name = "developer-port-forwarder"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.port_forwarder.metadata[0].name
  }

  subject {
    kind = "Group"
    name = var.azure_aad_group_developers_id
  }
}

# Give admins full access to the whole cluster
resource "kubernetes_cluster_role_binding" "admin_admin" {
  metadata {
    name = "admin-admin"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "admin"
  }

  subject {
    kind = "Group"
    name = var.azure_aad_group_admins_id
  }
}
