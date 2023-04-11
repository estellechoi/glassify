import { PREFERRED_WALLET_KEY, WalletType } from '@/constants/connect';
import { useCallback, useEffect } from 'react';
// import { bech32 } from 'bech32';
import { useRecoilState } from 'recoil';
import { walletAtom } from '@/state/atoms';
// import type { Key } from '@keplr-wallet/types';
import { connectKeplrThen } from '@/connection/utils';

const useConnect = () => {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  /** keplr wallet */
  const connectKeplr = useCallback(() => connectKeplrThen(setWallet), [setWallet]);

  useEffect(() => {
    if (wallet?.type === WalletType.KEPLR) {
      window.addEventListener('keplr_keystorechange', connectKeplr);
      return () => {
        window.removeEventListener('keplr_keystorechange', connectKeplr);
      };
    }
  }, [wallet?.type, connectKeplr]);

  /** @todo walletconnect setup */
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
