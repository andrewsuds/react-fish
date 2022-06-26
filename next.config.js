/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "api.aks22.com"],
  },
};

module.exports = nextConfig;
