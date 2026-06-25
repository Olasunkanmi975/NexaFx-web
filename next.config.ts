import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    domains: ["lh3.googleusercontent.com"],
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
>>>>>>> 764c305853999c314cc80ab46a510043b8848d49
  },
};

export default nextConfig;
