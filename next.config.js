/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./supabase-image-loader.js",
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "unsplash.com",
      "github.com",
      "lh3.googleusercontent.com",
      "bing.com",
      "enznhvirdexlccslbqzo.supabase.co",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "avatars.githubusercontent.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "unsplash.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "github.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "bing.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "enznhvirdexlccslbqzo.supabase.co",
    //   },
      
    // ],
  },
};

module.exports = nextConfig;
