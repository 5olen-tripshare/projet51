

resource "kubernetes_namespace" "postgres_ha" {
  metadata {
    name = "postgres-ha"
  }
}

resource "kubernetes_stateful_set" "etcd" {
  metadata {
    name      = "etcd"
    namespace = kubernetes_namespace.postgres_ha.metadata[0].name
  }
  spec {
    service_name = "etcd"
    replicas     = 1
    selector {
      match_labels = {
        app = "etcd"
      }
    }
    template {
      metadata {
        labels = {
          app = "etcd"
        }
      }
      spec {
        node_selector = {
          "kubernetes.io/hostname" = "k3s-master"
        }
        container {
          name  = "etcd"
          image = "quay.io/coreos/etcd:v3.5.0"
          command = [
            "etcd",
            "--name", "etcd",
            "--data-dir", "/var/lib/etcd",
            "--listen-client-urls", "http://0.0.0.0:2379",
            "--advertise-client-urls", "http://etcd:2379",
            "--listen-peer-urls", "http://0.0.0.0:2380",
            "--initial-advertise-peer-urls", "http://etcd:2380",
            "--initial-cluster", "etcd=http://etcd:2380"
          ]
        }
      }
    }
  }
}
