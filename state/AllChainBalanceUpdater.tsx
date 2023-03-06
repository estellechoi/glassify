import { useQueryChainBalances } from '@/data/queryHooks';
import { balancesDictAtom, walletAtom } from '@/state/states';
import type { ChainAccount } from '@/types/account';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

/** @desc JSX was used instead of hook to locate useQuery in loop */
const BalanceUpdator = ({ account }: { account: ChainAccount }) => {
  const [, setBalancesDict] = useRecoilState(balancesDictAtom);

  const { data: chainBalancesData } = useQueryChainBalances({ chainId: account.chainId, bech32Address: account.bech32Address });

  useEffect(() => {
    setBalancesDict((prev) => ({
      ...prev,
      [account.chainId]: { chainId: account.chainId, balances: chainBalancesData?.data.balances ?? [] },
    }));
  }, [chainBalancesData?.data.balances, account.chainId, setBalancesDict]);

  return <></>;
};

const AllChainBalanceUpdater = () => {
  const [wallet] = useRecoilState(walletAtom);

  return (
    <>
      {wallet?.accounts.map((account) => (
        <BalanceUpdator key={account.chainId} account={account} />
      ))}
    </>
  );
};

export default AllChainBalanceUpdater;
