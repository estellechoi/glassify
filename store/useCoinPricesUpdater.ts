import { useCoinPricesQuery } from '@/data/queryHooks';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { coinPriceDictAtom } from './atoms';

const useCoinPricesUpdater = () => {
  const [, setCoinPriceDict] = useRecoilState(coinPriceDictAtom);

  const { data: coinPricesData } = useCoinPricesQuery();

  useEffect(() => {
    if (coinPricesData?.data) setCoinPriceDict(coinPricesData.data);
  }, [coinPricesData?.data]);
};

export default useCoinPricesUpdater;
