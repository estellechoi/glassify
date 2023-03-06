import { CoinId, COIN_DETAIL_DICT } from '@/constants/coin';
import { useQueryCoinPrices } from '@/data/queryHooks';
import { CoinDetail } from '@/types/coin';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { coinDetailDictAtom } from './states';

const useCoinDetailUpdater = () => {
  const [, setCoinDetailDict] = useRecoilState(coinDetailDictAtom);

  const { data: coinPricesData } = useQueryCoinPrices();

  useEffect(() => {
    if (coinPricesData?.data) {
      const coinDetails = Object.keys(coinPricesData.data).map<[CoinId, CoinDetail]>((coinId) => {
        const coinDetail = COIN_DETAIL_DICT[coinId as CoinId];
        return [
          coinId as CoinId,
          {
            denom: coinDetail.denom,
            ticker: coinDetail.ticker,
            coinGeckoId: coinId as CoinId,
            decimal: coinDetail.decimal,
            priceFiat: coinPricesData.data[coinId],
          },
        ];
      });

      setCoinDetailDict(Object.fromEntries(new Map(coinDetails)));
    }
  }, [coinPricesData?.data, setCoinDetailDict]);
};

export default useCoinDetailUpdater;
