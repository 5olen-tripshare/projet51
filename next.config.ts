import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // !!!!!! ATTENTION !!!!!!
  // Ne pas oublier d'enlever les remotePatterns qui était utilisé pour le dossier accomodations.json
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: process.env.API_ACCOMMODATION_PORT,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
        pathname: "/xdata/images/**",
      },
      {
        protocol: "https",
        hostname: "carte-blanche.com",
        pathname: "/app/uploads/**",
      },
      {
        protocol: "https",
        hostname: "resize-elle.ladmedia.fr",
        pathname: "/rcrop/**",
      },
      {
        protocol: "https",
        hostname: "www.groupemasprovence.com",
        pathname: "/_objects/tao_medias/image/**",
      },
      {
        protocol: "https",
        hostname: "www.notreloft.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.villa-prestige-antilles.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/5fc7e5dc49687cd54d74d0c3/**",
      },
      {
        protocol: "https",
        hostname: "blog.halalbooking.com",
        pathname: "/content/images/**",
      },
      {
        protocol: "https",
        hostname: "www.myboutiquehotel.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "www.renovationettravaux.fr",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "blog.lacosta-properties-monaco.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "phrmeseng.rosselcdn.net",
        pathname: "/sites/default/files/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "medias.1001rives.fr",
        pathname: "/galerie-577875/**",
      },
    ],
  },
};

export default nextConfig;
