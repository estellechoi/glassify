import { useQuery } from '@tanstack/react-query';
import { Coin } from '@/types/coin';
import { handleResponse } from '@/data/utils';
import web2 from '@/data/web2';
import { QueryResult } from '@/data/types';

export const useCoinsQuery = (refetchInterval?: number) => {
  const result: QueryResult<Coin[]> = useQuery(['coins'], () => web2.get('/coins'), {
    refetchInterval,
  });
  return handleResponse(result);
};
