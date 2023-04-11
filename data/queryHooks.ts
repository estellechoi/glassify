import { CoinId } from '@/constants/coin';
import type { ChainId } from '@/constants/connect';
import { useQuery } from '@tanstack/react-query';
import * as api from './api';

export const useCoinPricesQuery = () => {
  return useQuery({
    queryKey: ['coinPrices'],
    queryFn: () => api.coingecko.getCoinGeckoPrice({ ids: Object.values(CoinId), vs_currencies: ['usd'] }),
  });
};

export const useChainBalancesQuery = ({ chainId, bech32Address }: { chainId: ChainId; bech32Address: string }) => {
  return useQuery({
    queryKey: ['chainBalances', chainId, bech32Address],
    queryFn: () => api.getBalances({ chainId: chainId, address: bech32Address }),
    refetchInterval: 3000,
  });
};
