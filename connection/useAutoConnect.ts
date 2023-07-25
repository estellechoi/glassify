import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import { userWalletAtom } from '@/store/states';
import type { Wallet, WalletType } from '@/types/wallet';

const useAutoConnect = (wallets: readonly Wallet[]) => {
  const [lastUsedWalletType, setLastUsedWalletType] = useState<WalletType | null>(null);

  useEffect(() => {
    const storedLastUsedWalletType = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET) as WalletType | undefined;
    setLastUsedWalletType(storedLastUsedWalletType ?? null);
  }, []);

  const [, setUserWallet] = useAtom(userWalletAtom);

  const lastUsedWallet = wallets.find((wallet) => wallet.type === lastUsedWalletType) ?? null;

  const connect = useCallback(async () => {
    if (!lastUsedWallet?.connector) return;

    const account = await lastUsedWallet.connector.connect();
    if (!account) return;

    setUserWallet({
      ...lastUsedWallet,
      account,
      connector: lastUsedWallet.connector,
    });
  }, [lastUsedWallet?.connector]);

  useEffect(() => {
    connect();
  }, [lastUsedWallet?.connector]);
};

export default useAutoConnect;
