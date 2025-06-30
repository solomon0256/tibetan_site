


variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API Token with permission to manage R2, KV, D1, etc."
}

variable "cloudflare_account_id" {
  type        = string
  description = "Your Cloudflare Account ID"
}