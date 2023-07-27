import type { BalanceData, OwnedNFTData } from '@/data/types';
import type { CMCQuoteData } from '@/pages/api/cmc/quotes';
import type BigNumber from 'bignumber.js';

export type Currency = 'USD';

export type BalanceItem = Readonly<
  BalanceData & { fiatValue: Record<Currency, BigNumber>; price: Record<Currency, number | null> }
>;

export type OwnedNFT = Readonly<OwnedNFTData & { floorPrice: { value: BigNumber; symbol?: string } }>;
