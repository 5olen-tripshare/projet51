terraform {
  required_version = ">= 1.5.0"
  backend "gcs" {
    bucket = "mon-bucket-terraform"  # Remplace par ton bucket GCS
    prefix = "terraform/state"
  }
}

provider "google" {
  credentials = file("terraform-sa-key.json")  # Remplace par ton fichier JSON d'authentification
  project     = "mon-projet-gcp" # Remplace par ton ID de projet
  region      = "europe-west1"
}

resource "google_cloud_run_service" "my_api" {
  name     = "my-api"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "gcr.io/mon-projet-gcp/my-api:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
