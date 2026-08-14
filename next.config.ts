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
  // certs/anantai.pem is read at process start via NODE_EXTRA_CA_CERTS, so
  // nothing imports it and tracing would otherwise leave it out of the bundle.
  outputFileTracingIncludes: {
    "/**": ["./certs/**"],
  },
  // ✅ Force Webpack (disable Turbopack)
  webpack: (config) => {
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
