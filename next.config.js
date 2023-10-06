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
  },
};

module.exports = nextConfig;
