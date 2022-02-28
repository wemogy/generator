resource "azurerm_resource_group" "default" {
  name     = local.prefix
  location = var.location

  lifecycle {
    prevent_destroy = true
  }
}
