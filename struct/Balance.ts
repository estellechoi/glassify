import BigNumber from 'bignumber.js';
import type { BalanceData } from '@/data/types';
import type { CMCQuoteData } from '@/pages/api/cmc/quotes';
import type { BalanceItem, TokenMarketData } from '@/types/asset';

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

  public get marketValues(): readonly TokenMarketData[] {
    return this.balancesData.map((balance) => {
      const { tokenAddress, decimals, symbol } = balance;

      const USDData = this.cmcQuotesData?.[balance.symbol]?.[0].quote?.USD;

      const price = USDData?.price ?? null;
      const priceChange24H = USDData?.percent_change_24h ?? null;

      const marketCap = USDData?.market_cap ?? null;
      const vol24H = USDData?.volume_24h ?? null;
      const vol24HChangePercentage = USDData?.volume_change_24h ?? null;

      return {
        tokenAddress,
        decimals,
        symbol,
        price: { USD: price },
        priceChange24H,
        marketCap,
        vol24H,
        vol24HChangePercentage,
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
