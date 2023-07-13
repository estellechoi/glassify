import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import { userWalletAtom } from '@/store/states';
import type { Wallet } from '@/types/wallet';

const useAutoConnect = (wallets: readonly Wallet[]) => {
  const [, setUserWallet] = useAtom(userWalletAtom);

  return useCallback(async () => {
    const lastUsedWalletType = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET);
    const lastUsedWallet = wallets.find((wallet) => wallet.type === lastUsedWalletType);

    if (!lastUsedWallet) return;

    const connected = await lastUsedWallet.connector?.connect();
    if (connected) setUserWallet(lastUsedWallet);
  }, [setUserWallet, wallets]);
};

export default useAutoConnect;
