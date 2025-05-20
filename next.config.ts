import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add domains you load images from
    formats: ["image/webp"], // Optional: for modern image formats
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Match all images from this domain
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
