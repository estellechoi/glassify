import type { Connector, EthAccount, Provider } from '@/connectors/types';

export type WalletType = 'metamask' | 'uniswap' | 'metamask_mobile';

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
