
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Define the domains for images
  images: {
    domains: ['vercel.com'],
  },
  // Define rewrites for API and documentation paths
  rewrites: async () => {
    return [
      {
        // Rewrite all API paths
        source: "/api/:path*",
        destination:
          // If in development mode, redirect to local server
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            // In production, use the /api/ path
            : "/api/",
      },
      {
        // Rewrite /docs path
        source: "/docs",
        destination:
          // If in development mode, redirect to local server
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            // In production, use the /api/docs path
            : "/api/docs",
      },
      {
        // Rewrite /openapi.json path
        source: "/openapi.json",
        destination:
          // If in development mode, redirect to local server
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            // In production, use the /api/openapi.json path
            : "/api/openapi.json",
      },
    ];
  },
};

export default nextConfig;

