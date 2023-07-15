import type BigNumber from 'bignumber.js';

export type BalanceData = {
  //   value: bigint;
  value: BigNumber;
  decimals: number;
  symbol: string;
};
