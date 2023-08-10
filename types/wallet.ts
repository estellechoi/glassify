import type { Connector, EthAccount } from '@/connectors/types';

export type WalletType = 'metamask' | 'uniswap' | 'metamask_mobile';

export type Wallet = Readonly<{
  type: WalletType;
  name: string;
  logoURL: string;
  getConnector: () => Promise<Connector | undefined>;
  onNoConnector: () => void;
}>;

export type ConnectedWallet = Readonly<
  Omit<Wallet, 'getConnector' | 'onNoConnector'> & {
    account: EthAccount;
    connector: Connector;
  }
>;
