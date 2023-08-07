import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import { userWalletAtom } from '@/store/states';
import type { Wallet, WalletType } from '@/types/wallet';
import useProcessing from '@/hooks/useProcessing';

const useAutoConnect = (wallets: readonly Wallet[]) => {
  const [lastUsedWalletType, setLastUsedWalletType] = useState<WalletType | null>(null);

  useEffect(() => {
    const storedLastUsedWalletType = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET) as WalletType | undefined;
    setLastUsedWalletType(storedLastUsedWalletType ?? null);
  }, []);

  const [, setUserWallet] = useAtom(userWalletAtom);

  const lastUsedWallet = useMemo<Wallet | null>(
    () => wallets.find((wallet) => wallet.type === lastUsedWalletType) ?? null,
    [wallets, lastUsedWalletType]
  );

  const { target: isConnecting, startProcessing: startConnecting, stopProcessing: stopConnecting } = useProcessing<boolean>();

  const connect = useCallback(async () => {
    if (!lastUsedWallet?.connector) return;

    startConnecting(true);

    const account = await lastUsedWallet.connector.connect();
    if (!account)  {
      stopConnecting();
      return;
    }

    setUserWallet({
      ...lastUsedWallet,
      account,
      connector: lastUsedWallet.connector,
    });

    stopConnecting();
  }, [lastUsedWallet, startConnecting, stopConnecting, setUserWallet]);

  useEffect(() => {
    connect();
  }, [lastUsedWallet?.connector]);

  return {
    isConnecting,
  };
};

export default useAutoConnect;
