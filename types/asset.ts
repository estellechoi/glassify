import { EthAddress } from '@/connectors/types';
import type { BalanceData, OwnedNFTData } from '@/data/types';
import type { CMCQuoteData } from '@/pages/api/cmc/quotes';
import type BigNumber from 'bignumber.js';

export type Currency = 'USD';

export type BalanceItem = Readonly<
  BalanceData & { fiatValue: Record<Currency, BigNumber>; price: Record<Currency, number | null> }
>;

export type OwnedNFT = Readonly<OwnedNFTData & { floorPrice: { value: BigNumber; symbol?: string } }>;

export type TokenMarketData = Readonly<{
  tokenAddress: EthAddress | undefined;
  decimals: number;
  symbol: string;
  price: Record<Currency, number | null>;
  priceChange24H: number | null;
  marketCap: number | null;
  vol24H: number | null;
  vol24HChangePercentage: number | null;
}>;
