import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds
  },
  // ✅ Force Webpack (disable Turbopack)
  webpack: (config) => {
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
