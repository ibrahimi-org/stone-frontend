/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This matches any request to /api/*
        destination: `${process.env.PARSE_ADDRESS}/:path*`, // Proxy to the external API
      },
    ];
  },
};

export default nextConfig;
