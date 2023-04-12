//@ts-check
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.coinpaprika.com',
      },
    ],
  },
};

const sentryCliPluginOptions = {};

const sentryOptions = {
  hideSourceMaps: true,
};

const withBundleAnalyzerOptions = { enabled: process.env.ANALYZE === 'true' };

const config = withBundleAnalyzer(withBundleAnalyzerOptions)(withSentryConfig(nextConfig, sentryCliPluginOptions, sentryOptions));

module.exports = config;
