# General settings
variable "project" {
  default     = "<%= name %>"
  description = "Will be attached to every resource name"
  type        = string
}

variable "environment" {
  default     = "<%= folder %>"
  description = "Will be attached to every resource name"
  type        = string
}

variable "location" {
  description = "Location of the Azure resources"
  default     = "westeurope"
  type        = string
}

