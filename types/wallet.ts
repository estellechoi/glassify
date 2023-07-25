import type { Connector, EthAccount } from '@/connectors/types';

export type WalletType = 'metamask' | 'uniswap';

export type Wallet = Readonly<{
  type: WalletType;
  name: string;
  logoURL: string;
  connector: Connector | undefined;
  onNoConnector: () => void;
}>;

export type ConnectedWallet = Readonly<
  Omit<Wallet, 'connector' | 'onNoConnector'> & {
    account: EthAccount;
    connector: Connector;
  }
>;
