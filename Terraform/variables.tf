variable "gcp_credentials" {
  description = "Clé JSON des identifiants Google Cloud"
  type        = string
}

variable "gcp_project" {
  description = "Nom du projet GCP"
  type        = string
}


variable "gcp_region" {
  description = "Région GCP"
  type        = string
  default     = "europe-west1"
}

variable "gcp_zone" {
  description = "Zone GCP"
  type        = string
  default     = "europe-west1-b"
}

variable "os_image" {
  description = "Image OS pour les VMs"
  type        = string
  default     = "rocky-linux-8"
}

variable "ssh_user" {
  description = "Nom d'utilisateur pour SSH"
  type        = string
  default     = "dakinizar46"
}

variable "ssh_public_key" {
  description = "Chemin de la clé publique SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
