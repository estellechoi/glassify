import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAssetInfoQuery } from '../data/useWeb2Query';
import { assetInfosAtom } from './states';

export default function StateUpdater() {
  const {
    isLoading,
    isFetching,
    isSuccess,
    error,
    errorMsg,
    data: assetInfosData,
  } = useAssetInfoQuery();

  console.log('assetInfosData', assetInfosData);

  const [, setAssetInfos] = useRecoilState(assetInfosAtom);

  useEffect(() => {
    setAssetInfos(assetInfosData?.data ?? []);
  }, [setAssetInfos, assetInfosData]);

  return <></>;
}
