import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  images: {
    unoptimized: true, // Static Export用
  },
  trailingSlash: true,
};

export default nextConfig;
