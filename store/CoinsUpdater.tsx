import { useCoinByIdQuery } from '@/data/queryHooks';
import { coinsDictAtom } from '@/store/atoms';
import { CoinId } from '@/types/coin';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

/** @description JSX was used instead of hook to have useQuery in loop */
const CoinUpdater = ({ coinId }: { coinId: CoinId }) => {
  const [, setCoinsDict] = useRecoilState(coinsDictAtom);

  const { data: coinData } = useCoinByIdQuery({ id: coinId });

  useEffect(() => {
    if (coinData?.data) {
      setCoinsDict((prev) => ({
        ...prev,
        [coinId]: coinData?.data,
      }));
    }
  }, [coinData?.data, coinId, setCoinsDict]);

  return <></>;
};

const CoinsUpdater = () => {
  return (
    <>
      {Object.values(CoinId).map((coinId, index) => (
        <CoinUpdater key={index} coinId={coinId} />
      ))}
    </>
  );
};

export default CoinsUpdater;
