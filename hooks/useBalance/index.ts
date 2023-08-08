import { useMemo } from 'react';
import { useBalancesQuery, useCMCQuotesQuery, useEthBalanceQuery } from '@/data/hooks';
import type { BalanceData } from '@/data/types';
import type { ConnectedWallet } from '@/types/wallet';
import Balance from 'struct/Balance';

const useBalance = (wallet: ConnectedWallet, refetchInterval = 0) => {
  const { data: ethBalanceData, isLoading: isEthBalanceLoading } = useEthBalanceQuery({ wallet }, refetchInterval);
  const { data: otherBalancesData, isLoading: isBalancesLoading } = useBalancesQuery({ wallet }, refetchInterval);

  const balancesData = useMemo<readonly BalanceData[]>(
    () => [...(otherBalancesData ?? []), ...(ethBalanceData ? [ethBalanceData] : [])],
    [ethBalanceData, otherBalancesData]
  );

  const symbols = useMemo<readonly string[]>(() => {
    return balancesData.map((balance) => balance.symbol) ?? [];
  }, [balancesData]);

  const { data: cmcQuotesData, isLoading: isCMCQuotesLoading } = useCMCQuotesQuery(symbols);

  return useMemo<{ balance: Balance; isLoading: boolean }>(() => {
    const balance = new Balance(balancesData, cmcQuotesData);
    const isLoading = isEthBalanceLoading || isBalancesLoading || isCMCQuotesLoading;

    return {
      balance,
      isLoading,
    };
  }, [balancesData, cmcQuotesData, isEthBalanceLoading, isBalancesLoading, isCMCQuotesLoading]);
};

export default useBalance;
