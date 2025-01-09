import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**', // Changed to allow any path
      },
    ],
  },
};


export default nextConfig;
