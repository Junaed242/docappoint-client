/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  serverExternalPackages: ["better-auth/kysely-adapter"],
  
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    
      
    ]
  }
};

export default nextConfig;