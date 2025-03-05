terraform {
  required_version = ">= 1.3.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  credentials = file("gcp-key.json")
  project     = var.gcp_project
  region      = "europe-west1"
}


