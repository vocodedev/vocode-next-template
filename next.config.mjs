
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Define the domains for images
  images: {
    domains: ['vercel.com'],
  },
  // Define rewrites for API and documentation paths
  rewrites: async () => {
    // Always rewrite to the local server at localhost:8000
    return [
      {
        // Rewrite all API paths to local server
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        // Rewrite /docs path to local server
        source: "/docs",
        destination: "http://127.0.0.1:8000/docs",
      },
      {
        // Rewrite /openapi.json path to local server
        source: "/openapi.json",
        destination: "http://127.0.0.1:8000/openapi.json",
      },
    ];
  },
};

export default nextConfig;

