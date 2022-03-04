variable "azure_aad_group_admins_id" {
  description = "Azure AD group ID for the Administrators group"
  default     = "<%- aadAdminGroupId %>"
}

variable "azure_aad_group_developers_id" {
  description = "Azure AD group ID for the Developers group"
  default     = "<%- aadDevGroupId %>"
}
