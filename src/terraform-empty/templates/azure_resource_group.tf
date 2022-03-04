resource "azurerm_resource_group" "default" {
  name     = var.environment
  location = var.location

  lifecycle {
    prevent_destroy = true
  }
}
