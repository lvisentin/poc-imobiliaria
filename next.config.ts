import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs2.cdn-imobibrasil.com.br",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
