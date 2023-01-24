import { useQuery } from '@tanstack/react-query';
import type { Coin, CoinDetail } from '@/types/coin';
import { handleResponse } from '@/data/utils';
import { QueryResult } from '@/data/types';
import { fetchCoinById, fetchCoins } from '@/data/fetchers';

export const useCoinsQuery = (refetchInterval?: number) => {
  const result: QueryResult<Coin[]> = useQuery(['coins'], fetchCoins, {
    refetchInterval,
  });
  return handleResponse(result);
};

export const useCoinByIdQuery = (params: { id: string }, refetchInterval?: number) => {
  const result: QueryResult<CoinDetail> = useQuery(['coins', params.id], () => fetchCoinById(params), {
    refetchInterval,
  });
  return handleResponse(result);
};
