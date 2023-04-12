import { useCoinByIdQuery } from '@/data/queryHooks';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { coinsDictAtom } from './atoms';
import { CoinId } from '@/types/coin';

const Updater = ({ id }: { id: CoinId }) => {
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

  return <></>;
};

const CoinsUpdater = () => {
  console.log(Object.values(CoinId));
  return (
    <>
      {/* {Object.values(CoinId).map((coinId) => (
        <Updater key={coinId} id={coinId} />
      ))} */}
    </>
  );
};

export default CoinsUpdater;
