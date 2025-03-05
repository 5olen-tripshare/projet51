output "k3s_master_internal_ip" {
  description = "Adresse IP interne du master K3s"
  value       = google_compute_instance.k3s_master.network_interface[0].network_ip
}

output "k3s_proxy_public_ip" {
  description = "Adresse IP publique du proxy"
  value       = google_compute_instance.k3s_proxy.network_interface[0].access_config[0].nat_ip
}

output "k3s_nodes_internal_ips" {
  description = "Adresses IP internes des nœuds K3s"
  value       = [
    google_compute_instance.k3s_node_0.network_interface[0].network_ip,
    google_compute_instance.k3s_node_1.network_interface[0].network_ip
  ]
}
