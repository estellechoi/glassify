import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import { userWalletAtom } from '@/store/states';
import type { Wallet, WalletType } from '@/types/wallet';
import useConnect from './useConnect';

const storedLastUsedWalletType = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET) as WalletType | undefined;

const useAutoConnect = (wallets: readonly Wallet[]) => {
  const [, setUserWallet] = useAtom(userWalletAtom);

  const { connect, connectingWallet } = useConnect();

  const connectAndSetWallet = useCallback(
    async (wallet: Wallet) => {
      const connectedData = await connect(wallet);
      if (!connectedData) return;

      const { type, name, logoURL } = connectedData.wallet;
      setUserWallet({
        type,
        name,
        logoURL,
        account: connectedData.account,
        connector: connectedData.connector,
      });
    },
    [connect, setUserWallet]
  );

  useEffect(() => {
    const lastUsedWallet = wallets.find((wallet) => wallet.type === storedLastUsedWalletType) ?? null;
    if (!lastUsedWallet) return;

    connectAndSetWallet(lastUsedWallet);
  }, [wallets]);

  return {
    isConnecting: !!connectingWallet,
  };
};

export default useAutoConnect;
