import { init, Breadcrumbs } from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DNS;

init({
  dsn: SENTRY_DSN,
  integrations: [
    new Breadcrumbs({
      console: process.env.NODE_ENV === 'production',
    }),
  ],
  environment: process.env.NODE_ENV,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  ignoreErrors: [],
});