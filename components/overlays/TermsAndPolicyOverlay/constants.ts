export const DIALOG_TITLE = 'Terms and Policy';

export const THRD_PARTY_SERVICES: readonly {
  title: string;
  href?: string;
  description: string;
}[] = [
  {
    title: 'Alchemy',
    href: 'https://www.alchemy.com',
    description: 'This app uses Alchemy to fetch Ethereum on-chain data and make contract calls.',
  },
  {
    title: 'CoinMarketCap API',
    href: 'https://coinmarketcap.com/api',
    description: 'This app uses CoinMarketCap API to fetch off-chain data such as orcle price.',
  },
  {
    title: 'MetaMask SDK',
    href: 'https://metamask.io/sdk/',
    description: 'This app connects MetaMask wallet using MetaMask SDK.',
  },
  {
    title: 'Google Analytics & Mixpanel',
    description: 'This app logs anonymized usage statistics in order to improve user experience over time.',
  },
];
