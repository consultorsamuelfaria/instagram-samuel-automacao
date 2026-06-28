/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_INSTAGRAM_TOKEN: process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN,
    NEXT_PUBLIC_CLAUDE_API_KEY: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
  },
};

module.exports = nextConfig;
