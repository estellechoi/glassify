import METAMASK_LOGO_URL from '@/resources/images/wallet_metamask.svg';
import UNISWAP_WALLET_LOGO from '@/resources/images/wallet_uniswap.png';
import { initializeUniswapWallet } from '@/connection/uniswapWallet';
import { initializeMetamask } from '@/connection/metamask';
import type { Wallet } from '@/types/wallet';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import { useCallback, useMemo } from 'react';

const useWallets = (): readonly Wallet[] => {
  const [, setUserWallet] = useAtom(userWalletAtom);

  const deleteUserWallet = useCallback(() => setUserWallet(null), [setUserWallet]);

  const metamask: Wallet = useMemo(
    () => ({
      type: 'metamask',
      name: 'MetaMask',
      logoURL: METAMASK_LOGO_URL,
      getConnector: () => initializeMetamask({ onError: deleteUserWallet, onMissConnection: deleteUserWallet }),
      onNoConnector: () => {
        window.open('https://metamask.io/', 'inst_metamask');
      },
    }),
    [deleteUserWallet]
  );

  const uniswapWallet: Wallet = useMemo(
    () => ({
      type: 'uniswap',
      name: 'Uniswap Wallet',
      logoURL: UNISWAP_WALLET_LOGO.src,
      getConnector: () => initializeUniswapWallet({ onError: deleteUserWallet }),
      onNoConnector: () => {
        alert('Uniswap Wallet support is coming soon!');
      },
      isComing: true,
    }),
    [deleteUserWallet]
  );

  return useMemo(() => [metamask, uniswapWallet], [metamask, uniswapWallet]);
};

export default useWallets;
