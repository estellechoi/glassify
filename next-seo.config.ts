import type { NextSeoProps } from 'next-seo';

export const SEO: NextSeoProps = {
  titleTemplate: '%s | Paper',
  defaultTitle: 'Paper',
  description: 'Paper is a simple and fast way to manage your web3 portfolio.',
  themeColor: '#f5f5f5',
  openGraph: {
    type: 'website',
    title: 'Paper - Finance effortless all hours',
    description: 'Paper is a simple and fast way to manage your web3 portfolio.',
    images: [{ url: './docs/logo_overview.jpg' }],
  },
  twitter: {
    handle: '@estele_choi',
    site: '@estele_choi',
    cardType: 'summary_large_image',
  },
};
