/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "localhost",
      "vercel.app",
      "blob.vercel-storage.com"
    ]
  }
};

module.exports = nextConfig;
