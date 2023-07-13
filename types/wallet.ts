import type { Connector } from '@/connectors/types';

export type WalletType = 'metamask' | 'uniswap';

export type Wallet = {
  type: WalletType;
  name: string;
  logoUrl: string;
  connector: Connector | undefined;
  onNoConnector: () => void;
};
