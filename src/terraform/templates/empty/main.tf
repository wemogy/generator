# To use Azure Storage as remote backend to save state, follow the
# official guide, to setup the Storage Account:
# https://docs.microsoft.com/en-us/azure/terraform/terraform-backend
# export ARM_ACCESS_KEY=$(az storage account keys list -g terraform --account-name wemogycloudtfbackend -o tsv --query "[0].value")

terraform {
  required_version = ">= 1.0.0"

  backend "azurerm" {
    storage_account_name = "wemogycloudtfbackend"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }

  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 1.6.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.69.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.3.2"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "0dce37d2-715f-42a8-8297-7b3b30382521"
  tenant_id       = "366f0c02-d569-4dae-a693-34d9262182ea"
}

# provider "kubernetes" {
#   load_config_file       = "false"
#   host                   = azurerm_kubernetes_cluster.default.kube_config.0.host
#   username               = azurerm_kubernetes_cluster.default.kube_config.0.username
#   password               = azurerm_kubernetes_cluster.default.kube_config.0.password
#   client_certificate     = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.client_certificate)
#   client_key             = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.client_key)
#   cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.cluster_ca_certificate)
# }

# provider "helm" {
#   kubernetes {
#     host                   = azurerm_kubernetes_cluster.default.kube_config.0.host
#     username               = azurerm_kubernetes_cluster.default.kube_config.0.username
#     password               = azurerm_kubernetes_cluster.default.kube_config.0.password
#     client_certificate     = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.client_certificate)
#     client_key             = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.client_key)
#     cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.default.kube_config.0.cluster_ca_certificate)
#   }
# }

data "azurerm_client_config" "current" {}
