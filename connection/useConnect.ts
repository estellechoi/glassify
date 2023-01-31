import { ChainId, PREFERRED_WALLET_KEY, WalletType } from '@/constants/connect';
import { useCallback, useEffect } from 'react';
import { bech32 } from 'bech32';
import { useRecoilState } from 'recoil';
import { walletAtom } from '@/state/states';
import type { Key } from '@keplr-wallet/types';

const useConnect = () => {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  /** @desc keplr connection; doc: https://docs.keplr.app/api/ */
  const connectKeplr = useCallback(async () => {
    if (!window.keplr) {
      console.log('Please install keplr extension');
      return;
    }

    try {
      const cosmosChainIds = Object.values(ChainId).filter((chainId) => chainId !== ChainId.ETHEREUM);

      await window.keplr.enable(cosmosChainIds);

      const key = await window.keplr.getKey(ChainId.COSMOS);
      const repAccount = {
        chainId: ChainId.COSMOS,
        isKeystone: key.isKeystone,
        isNanoLedger: key.isNanoLedger,
        name: key.name,
        bech32Address: key.bech32Address,
      };

      const accounts = await Promise.all(
        cosmosChainIds.map(async (chainId) => {
          //@ts-ignore
          const key = await window.keplr.getKey(chainId);
          return {
            chainId,
            isKeystone: key.isKeystone,
            isNanoLedger: key.isNanoLedger,
            name: key.name,
            bech32Address: key.bech32Address,
          };
        })
      );

      setWallet({
        type: WalletType.KEPLR,
        repAccount,
        accounts,
      });

      localStorage.setItem(PREFERRED_WALLET_KEY, WalletType.KEPLR);
    } catch (e) {
      console.log('Wallet connection error', e);
    }
  }, [setWallet]);

  useEffect(() => {
    if (wallet?.type === WalletType.KEPLR) {
      window.addEventListener('keplr_keystorechange', connectKeplr);
      return () => {
        window.removeEventListener('keplr_keystorechange', connectKeplr);
      };
    }
  }, [wallet?.type, connectKeplr]);

  /** @todo walletconnect connection */

  /** @desc connect function by wallet type */
  const connectTo = useCallback(
    (walletType: WalletType) => {
      const CONNECT_FUNC_DICT: { [key in WalletType]: () => void } = {
        [WalletType.KEPLR]: connectKeplr,
        [WalletType.WALLETCONNECT]: connectKeplr,
      };

      CONNECT_FUNC_DICT[walletType]();
    },
    [connectKeplr]
  );

  useEffect(() => {
    const preferredWallet = Object.values(WalletType).find((type) => type === localStorage.getItem(PREFERRED_WALLET_KEY));
    preferredWallet ? connectTo(preferredWallet) : connectKeplr();
  }, []);

  return {
    connectTo,
  };
};

export default useConnect;
