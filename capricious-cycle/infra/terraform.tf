

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "= 4.52.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_r2_bucket" "course_assets" {
  name       = "tibetan-site-r2"
  account_id = var.cloudflare_account_id
}

resource "cloudflare_workers_kv_namespace" "kv_cache" {
  title      = "TIBETAN_KV_CACHE"
  account_id = var.cloudflare_account_id
}
