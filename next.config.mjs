/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "plus.unsplash.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This matches any request to /api/*
        destination: `${process.env.NEXT_PUBLIC_PARSE_ADDRESS}/:path*`, // Proxy to the external API
      },
    ];
  },
};

export default nextConfig;
