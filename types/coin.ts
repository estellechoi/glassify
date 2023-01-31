import { CoinId } from '@/constants/coin';

export type PriceFiat = { usd: number };

export type CoinPriceDict = {
  [coinId: string]: PriceFiat;
};

export type CoinAmount = {
  denom: string;
  amount: string;
};

export type CoinDetail = {
  denom: string;
  ticker: string;
  coinGeckoId: CoinId;
  decimal: number;
  priceFiat: PriceFiat;
};

export type CoinDetailDict = {
  [coinId: string]: CoinDetail;
};
