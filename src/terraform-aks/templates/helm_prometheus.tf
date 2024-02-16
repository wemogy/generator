resource "helm_release" "prometheus" {
  name             = "prometheus"
  namespace        = "monitoring-system"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  version          = "20.0.1"
  create_namespace = true

  set {
    name  = "prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName"
    value = "default"
    type  = "string"
  }

  set {
    name  = "prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.accessModes[0]"
    value = "ReadWriteOnce"
    type  = "string"
  }

  set {
    name  = "prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage"
    value = "50Gi"
    type  = "string"
  }

  set {
    name  = "prometheus.prometheusSpec.retention"
    value = "100d"
    type  = "string"
  }

  set {
    name  = "alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.storageClassName"
    value = "default"
    type  = "string"
  }

  set {
    name  = "alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.accessModes[0]"
    value = "ReadWriteOnce"
    type  = "string"
  }

  set {
    name  = "alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.resources.requests.storage"
    value = "10Gi"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.enabled"
    value = "true"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.type"
    value = "sts"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.storageClassName"
    value = "default"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.accessModes[0]"
    value = "ReadWriteOnce"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.size"
    value = "20Gi"
    type  = "string"
  }

  set {
    name  = "grafana.persistence.finalizers[0]"
    value = "kubernetes.io/pvc-protection"
    type  = "string"
  }
}
