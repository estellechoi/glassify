import { ChainId, WalletType } from '@/constants/connect';
import { BigNumber } from 'bignumber.js';

export type ChainAccount = {
  name: string;
  chainId: ChainId;
  bech32Address: string;
  isKeystone: boolean;
  isNanoLedger: boolean;
};

export type Wallet = {
  type: WalletType;
  repAccount: ChainAccount;
  accounts: ChainAccount[];
};

export type ChainBalance = {
  chainId: ChainId;
  balances: { denom: string; amount: string }[];
};

export type AmountFiat = {
  usd: BigNumber;
};
