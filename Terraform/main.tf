terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  credentials = file(var.gcp_credentials)
  project     = var.gcp_project
  region      = var.gcp_region
}

# 🔹 Créer un réseau VPC
resource "google_compute_network" "vpc_network" {
  name                    = "k3s-network"
  auto_create_subnetworks = true
}

# 🔹 Règle firewall pour autoriser le trafic SSH et API K3s
resource "google_compute_firewall" "allow_ssh_k3s" {
  name    = "allow-ssh-k3s"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22", "6443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# 🔹 Définition des instances (VMs)
resource "google_compute_instance" "k3s_master" {
  name         = "k3s-master"
  machine_type = "e2-medium"
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = var.os_image
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {} # Pour obtenir une IP publique (peut être supprimé)
  }

  metadata = {
    ssh-keys = "${var.ssh_user}:${file(var.ssh_public_key)}"
  }
}

resource "google_compute_instance" "k3s_node_0" {
  name         = "k3s-node-0"
  machine_type = "e2-medium"
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = var.os_image
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
  }

  metadata = {
    ssh-keys = "${var.ssh_user}:${file(var.ssh_public_key)}"
  }
}

resource "google_compute_instance" "k3s_node_1" {
  name         = "k3s-node-1"
  machine_type = "e2-medium"
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = var.os_image
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
  }

  metadata = {
    ssh-keys = "${var.ssh_user}:${file(var.ssh_public_key)}"
  }
}

resource "google_compute_instance" "k3s_proxy" {
  name         = "k3s-proxy"
  machine_type = "e2-small"
  zone         = var.gcp_zone

  boot_disk {
    initialize_params {
      image = var.os_image
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {} # Ajoute une IP publique
  }

  metadata = {
    ssh-keys = "${var.ssh_user}:${file(var.ssh_public_key)}"
  }
}
