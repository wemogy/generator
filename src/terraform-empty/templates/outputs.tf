output "prefix" {
  value       = azurerm_public_ip.default.ip_address
  description = "Name prefi that got prepended to every resource"
}
