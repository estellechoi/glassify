import { useQuery } from 'react-query';
import { fetchAssetInfo } from './fetchers';
import { handleResponse } from './utils';

export const useAssetInfoQuery = (refetchInterval?: number) =>
  handleResponse(
    useQuery('assetInfo', fetchAssetInfo, {
      refetchInterval,
    })
  );
