export enum EventCategory {
  PAGE_VIEW = 'Pageview',
  ERROR_BOUNDARY = 'ErrorBoundary',
  WALLET_CONNECTION = 'WalletConnection',
}

export const isDevMode = process.env.NODE_ENV === 'development';
