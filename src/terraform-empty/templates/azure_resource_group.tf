resource "azurerm_resource_group" "default" {
  name     = <% if (isSingleResourceGroup) { %>local.prefix<% } else { %>var.environment<% } %>
  location = var.location

  lifecycle {
    prevent_destroy = true
  }
}
