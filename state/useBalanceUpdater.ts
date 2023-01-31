import { fetchBalances } from '@/data/chain';
import { chainBalancesAtom, walletAtom } from '@/state/states';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useBalanceUpdater = () => {
  const [wallet] = useRecoilState(walletAtom);

  const [, setChainBalances] = useRecoilState(chainBalancesAtom);

  const fetchAllBalances = useCallback(async () => {
    const balances = await Promise.all(
      wallet?.accounts.map(async (account) => {
        const res = await fetchBalances({ chainId: account.chainId, address: account.bech32Address });
        return {
          chainId: account.chainId,
          balances: res?.data.balances,
        };
      }) ?? []
    );

    setChainBalances(balances);
  }, [wallet?.accounts, setChainBalances]);

  useEffect(() => {
    fetchAllBalances();
  }, [fetchAllBalances]);
};

export default useBalanceUpdater;
