# General settings
variable "project" {
  default     = "my-project" # TODO: ask for name
  description = "Will be attached to every resource name"
  type        = string
}

variable "environment" {
  default     = ""
  description = "Will be attached to every resource name"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group you want to deploy to"
  type        = string
}

variable "location" {
  description = "Location of the Azure resources"
  default     = "westeurope"
  type        = string
}

