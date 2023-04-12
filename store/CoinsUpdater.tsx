import { useCoinByIdQuery } from '@/data/queryHooks';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { coinsDictAtom } from './atoms';
import { CoinId } from '@/types/coin';

const useCoinPricesUpdater = (id: CoinId) => {
  const [, setCoinsDictAtom] = useRecoilState(coinsDictAtom);

  const { data: coinData } = useCoinByIdQuery({ id });
  console.log('coinData', coinData?.data);

  useEffect(() => {
    const data = coinData?.data;
    if (data) {
      setCoinsDictAtom((prev) => ({
        ...prev,
        [data.id]: data,
      }));
    }
  }, [coinData?.data]);
};

const Updater = ({ id }: { id: CoinId }) => {
  useCoinPricesUpdater(id);

  return <></>;
};

const CoinsUpdater = () => {
  return (
    <>
      {Object.values(CoinId).map((coinId) => (
        <Updater key={coinId} id={coinId} />
      ))}
    </>
  );
};

export default CoinsUpdater;
