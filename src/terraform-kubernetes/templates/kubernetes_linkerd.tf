# Linkerd "Trust Anchor" certificate (the root CA)
resource "tls_private_key" "linkerd_trustanchor_key" {
  algorithm   = "ECDSA"
  ecdsa_curve = "P256"
}

resource "tls_self_signed_cert" "linkerd_trustanchor_cert" {
  key_algorithm         = tls_private_key.linkerd_trustanchor_key.algorithm
  private_key_pem       = tls_private_key.linkerd_trustanchor_key.private_key_pem
  validity_period_hours = 87600
  is_ca_certificate     = true

  subject {
    common_name = "identity.linkerd.cluster.local"
  }

  allowed_uses = [
    "crl_signing",
    "cert_signing",
    "server_auth",
    "client_auth"
  ]
}

# Linkerd "Issuer" certificate
resource "tls_private_key" "linkerd_issuer_key" {
  algorithm   = "ECDSA"
  ecdsa_curve = "P256"
}

resource "tls_cert_request" "linkerd_issuer_request" {
  key_algorithm   = tls_private_key.linkerd_issuer_key.algorithm
  private_key_pem = tls_private_key.linkerd_issuer_key.private_key_pem

  subject {
    common_name = "identity.linkerd.cluster.local"
  }
}

resource "tls_locally_signed_cert" "linkerd_issuer_cert" {
  cert_request_pem      = tls_cert_request.linkerd_issuer_request.cert_request_pem
  ca_key_algorithm      = tls_private_key.linkerd_trustanchor_key.algorithm
  ca_private_key_pem    = tls_private_key.linkerd_trustanchor_key.private_key_pem
  ca_cert_pem           = tls_self_signed_cert.linkerd_trustanchor_cert.cert_pem
  validity_period_hours = 8760
  is_ca_certificate     = true

  allowed_uses = [
    "crl_signing",
    "cert_signing",
    "server_auth",
    "client_auth"
  ]
}

resource "helm_release" "linkerd" {
  name       = "linkerd"
  repository = "https://helm.linkerd.io/stable"
  chart      = "linkerd2"
  version    = "2.10.2"

  set {
    name  = "identityTrustAnchorsPEM"
    value = tls_self_signed_cert.linkerd_trustanchor_cert.cert_pem
  }

  set {
    name  = "identity.issuer.crtExpiry"
    value = tls_locally_signed_cert.linkerd_issuer_cert.validity_end_time
  }

  set {
    name  = "identity.issuer.tls.crtPEM"
    value = tls_locally_signed_cert.linkerd_issuer_cert.cert_pem
  }

  set {
    name  = "identity.issuer.tls.keyPEM"
    value = tls_private_key.linkerd_issuer_key.private_key_pem
  }
}

resource "helm_release" "linkerd_viz" {
  name       = "linkerd-viz"
  repository = "https://helm.linkerd.io/stable"
  chart      = "linkerd-viz"
  version    = "2.10.2"

  depends_on = [
    helm_release.linkerd,
  ]
}
