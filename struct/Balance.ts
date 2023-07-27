import BigNumber from 'bignumber.js';
import type { BalanceData } from '@/data/types';
import type { CMCQuoteData } from '@/pages/api/cmc/quotes';
import type { BalanceItem } from '@/types/asset';

class Balance {
  private balancesData: readonly BalanceData[];
  private cmcQuotesData?: {
    [symbol: string]: readonly CMCQuoteData[];
  };

  constructor(
    balancesData: readonly BalanceData[],
    cmcQuotesData?: {
      [symbol: string]: readonly CMCQuoteData[];
    }
  ) {
    this.balancesData = balancesData;
    this.cmcQuotesData = cmcQuotesData;
  }

  public get balances(): readonly BalanceItem[] {
    return this.balancesData.map((balance) => {
      const price = this.cmcQuotesData?.[balance.symbol]?.[0].quote?.USD?.price ?? null;
      const fiatValue = balance.value.times(price ?? 0);

      return {
        ...balance,
        fiatValue: { USD: fiatValue },
        price: { USD: price },
      };
    });
  }

  public get totalValueUSD(): BigNumber {
    return this.balances.reduce((acc, balance) => {
      return acc.plus(balance.fiatValue.USD);
    }, new BigNumber(0));
  }
}

export default Balance;
