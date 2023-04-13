import type { ChainId } from '@/constants/connect';
import { useQuery } from '@tanstack/react-query';
import * as api from './api';
import type { CoinId } from '@/types/coin';

/** @description coingecko api */
export const useCoinsQuery = () => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: () => api.coingecko.getCoins(),
  });
};

export const useCoinByIdQuery = ({ id, enabled = true }: { id: CoinId; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['coins', id],
    queryFn: () => api.coingecko.getCoinById({ id }),
    enabled,
  });
};

/** @description on-chain lcd */
export const useChainBalancesQuery = ({ chainId, bech32Address }: { chainId: ChainId; bech32Address: string }) => {
  return useQuery({
    queryKey: ['chainBalances', chainId, bech32Address],
    queryFn: () => api.getBalances({ chainId: chainId, address: bech32Address }),
    refetchInterval: 3000,
  });
};
