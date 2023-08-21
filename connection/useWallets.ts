import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import METAMASK_LOGO_URL from '@/resources/images/wallet_metamask.svg';
import UNISWAP_WALLET_LOGO from '@/resources/images/wallet_uniswap.png';
import { initializeUniswapWallet } from '@/connection/uniswapWallet';
import { initializeMetamask } from '@/connection/metamask';
import type { Wallet } from '@/types/wallet';
import { userWalletAtom } from '@/store/states';

const useWallets = (): readonly Wallet[] => {
  const [, setUserWallet] = useAtom(userWalletAtom);

  const resetUserWallet = useCallback(() => setUserWallet(null), [setUserWallet]);

  const metamask: Wallet = useMemo(
    () => ({
      type: 'metamask',
      name: 'MetaMask',
      logoURL: METAMASK_LOGO_URL,
      getConnector: () => initializeMetamask({ onError: resetUserWallet }),
      onNoConnector: () => {
        window.open('https://metamask.io/', 'inst_metamask');
      },
    }),
    [resetUserWallet]
  );

  const uniswapWallet: Wallet = useMemo(
    () => ({
      type: 'uniswap',
      name: 'Uniswap Wallet',
      logoURL: UNISWAP_WALLET_LOGO.src,
      getConnector: () => initializeUniswapWallet({ onError: resetUserWallet }),
      onNoConnector: () => {
        alert('Uniswap Wallet support is coming soon!');
      },
      isComing: true,
    }),
    [resetUserWallet]
  );

  return useMemo(() => [metamask, uniswapWallet], [metamask, uniswapWallet]);
};

export default useWallets;
