import METAMASK_LOGO_URL from '@/resources/images/wallet_metamask.svg';
import UNISWAP_WALLET_LOGO_URL from '@/resources/images/wallet_uniswap.svg';
import { initializeUniswapWallet } from '@/connection/uniswapWallet';
import { initializeMetamask } from '@/connection/metamask';
import type { Wallet } from '@/types/wallet';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import { useCallback } from 'react';

const useWallets = (): readonly Wallet[] => {
  const [, setUserWallet] = useAtom(userWalletAtom);

  const deleteUserWallet = useCallback(() => setUserWallet(null), [setUserWallet]);

  const metamask: Wallet = {
    type: 'metamask',
    name: 'MetaMask',
    logoURL: METAMASK_LOGO_URL,
    getConnector: () => initializeMetamask({ onError: deleteUserWallet, onMissConnection: deleteUserWallet }),
    onNoConnector: () => {
      window.open('https://metamask.io/', 'inst_metamask');
    },
  };

  const uniswapWallet: Wallet = {
    type: 'uniswap',
    name: 'Uniswap Wallet',
    logoURL: UNISWAP_WALLET_LOGO_URL,
    getConnector: () => initializeUniswapWallet({ onError: deleteUserWallet }),
    onNoConnector: () => {
      alert('Uniswap Wallet support is coming soon!');
    },
  };

  return [metamask, uniswapWallet];
};

export default useWallets;
