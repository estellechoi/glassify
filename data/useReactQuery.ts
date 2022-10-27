import { useQuery } from 'react-query';
import { AssetInfoRaw } from '../types/asset';
import { fetchAssetInfo } from './fetchers';
import { QueryResponse } from './types';
import { handleResponse } from './utils';

export const useAssetInfoQuery = (refetchInterval?: number) =>
  handleResponse<QueryResponse<AssetInfoRaw[]>>(
    useQuery('assetInfo', fetchAssetInfo, {
      refetchInterval,
    })
  );
