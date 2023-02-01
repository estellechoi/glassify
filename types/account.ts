import { ChainId, WalletType } from '@/constants/connect';
import { BigNumber } from 'bignumber.js';
import { CoinAmount, CoinDetail } from './coin';

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
  balances: CoinAmount[];
};

export type AmountFiat = {
  usd: BigNumber;
};

export type BalanceDetail = CoinDetail & {
  onChainId: ChainId;
  denom: string;
  amount: BigNumber;
  amountFiat: AmountFiat;
};
