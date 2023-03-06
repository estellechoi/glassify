import { CoinId } from '@/constants/coin';
import type { ChainId } from '@/constants/connect';
import { useQuery } from '@tanstack/react-query';
import { fetchBalances } from './chain';
import { fetchCoinGeckoPrice } from './coingecko';

export const useQueryCoinPrices = () => {
  return useQuery({
    queryKey: ['coinPrices'],
    queryFn: () => fetchCoinGeckoPrice({ ids: Object.values(CoinId), vs_currencies: ['usd'] }),
  });
};

export const useQueryChainBalances = ({ chainId, bech32Address }: { chainId: ChainId; bech32Address: string }) => {
  return useQuery({
    queryKey: ['chainBalances', chainId, bech32Address],
    queryFn: () => fetchBalances({ chainId: chainId, address: bech32Address }),
    refetchInterval: 3000,
  });
};
