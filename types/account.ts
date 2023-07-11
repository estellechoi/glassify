import { Chain, WalletType } from '@/constants/connect';
import { BigNumber } from 'bignumber.js';

export type ChainAccount = {
  name: string;
  chainId: Chain;
  bech32Address: string;
  isKeystone: boolean;
  isNanoLedger: boolean;
};

export type Wallet = {
  type: WalletType;
  repAccount: ChainAccount;
  accounts: ChainAccount[];
};
