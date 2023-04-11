import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { SentryCliPluginOptions } from '@sentry/webpack-plugin';
import type { NextConfig } from 'next';
import type { UserSentryOptions } from '@sentry/nextjs/types/config/types';

const nextConfig: NextConfig = {
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

const sentryCliPluginOptions: Partial<SentryCliPluginOptions> = {};
const sentryOptions: UserSentryOptions = {
  hideSourceMaps: true,
};

const withBundleAnalyzerOptions = { enabled: process.env.ANALYZE === 'true' };

const config = withBundleAnalyzer(withBundleAnalyzerOptions)(withSentryConfig(nextConfig, sentryCliPluginOptions, sentryOptions));

export default config;
