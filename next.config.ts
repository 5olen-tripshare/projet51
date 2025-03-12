import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "accommodation.doubli.fr",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
