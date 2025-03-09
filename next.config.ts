import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
