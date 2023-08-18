import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import { userWalletAtom } from '@/store/states';
import type { Wallet, WalletType } from '@/types/wallet';
import useProcessing from '@/hooks/useProcessing';
import useConnect from './useConnect';

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

  const { connect, connectingWallet } = useConnect();

  const connectAndSetWallet = useCallback(async () => {
    if (!lastUsedWallet) return;

    const connectedData = await connect(lastUsedWallet);
    if (!connectedData) return;

    const { type, name, logoURL } = connectedData.wallet;
    setUserWallet({
      type,
      name,
      logoURL,
      account: connectedData.account,
      connector: connectedData.connector,
    });
  }, [lastUsedWallet, connect, setUserWallet]);

  useEffect(() => {
    connectAndSetWallet();
  }, [lastUsedWallet]);

  return {
    isConnecting: !!connectingWallet,
  };
};

export default useAutoConnect;
