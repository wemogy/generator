# To use Azure Storage as remote backend to save state, follow the
# official guide, to setup the Storage Account: https://docs.microsoft.com/en-us/azure/terraform/terraform-backend
#
# export ARM_ACCESS_KEY=$(az storage account keys list -g terraform --account-name <%= remoteBackendStorageAccountName %> -o tsv --query "[0].value")

terraform {
  required_version = ">= 1.0.0"

  backend "azurerm" {
    storage_account_name = "<%= remoteBackendStorageAccountName %>"
    container_name       = "<%= remoteBackendStorageBlobContainerName %>"
    key                  = "dev.tfstate"
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
