// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...withBundleAnalyzer({}),
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.coinpaprika.com',
        // port: '',
        // pathname: '/*',
      },
    ],
    // domains: ["static.coinpaprika.com"]
  }
}

module.exports = nextConfig
