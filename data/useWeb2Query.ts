import { useQuery } from 'react-query';
import { AssetInfoRaw } from '../types/asset';
import { QueryRes } from './types';
import { handleResponse } from './utils';
import web2 from './web2';

export const useAssetInfoQuery = (refetchInterval?: number) =>
  handleResponse<QueryRes<AssetInfoRaw[]>>(
    useQuery('assetInfo', () => web2.get('/asset/info'), {
      refetchInterval,
    })
  );
