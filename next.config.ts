import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ebxqpvwejbwxyppqvwzw.supabase.co',
      },
    ],
  },
  devIndicators: false
};

export default nextConfig;
