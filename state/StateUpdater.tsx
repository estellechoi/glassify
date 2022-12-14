import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useCoinsQuery } from '@/data/useWeb2Query';
import { coinsAtom } from '@/state/states';

export default function StateUpdater() {
  const {
    isLoading,
    isFetching,
    isSuccess,
    error,
    errorMsg,
    data: coinsData,
  } = useCoinsQuery();

  console.log('useCoinsQuery', coinsData?.slice(0, 20));

  const [, setCoinsAtom] = useRecoilState(coinsAtom);

  useEffect(() => {
    if (coinsData) setCoinsAtom(coinsData);
  }, [setCoinsAtom, coinsData]);

  return <></>;
}
