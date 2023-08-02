import useConnector from './useConnector';
import METAMASK_LOGO_URL from '@/resources/images/wallet_metamask.svg';
import UNISWAP_WALLET_LOGO_URL from '@/resources/images/wallet_uniswap.svg';
import { initializeUniswapWallet } from '@/connection/uniswapWallet';
import { initializeMetamaskMobile } from '@/connection/metamaskMobile';
import type MetaMask from '@/connectors/MetaMask';
import type UniswapWallet from '@/connectors/UniswapWallet';
import type { Wallet } from '@/types/wallet';

const useWallets = (): readonly Wallet[] => {
  const metamaskConnector = useConnector<MetaMask>(initializeMetamaskMobile);
  const metamask: Wallet = {
    type: 'metamask',
    name: 'MetaMask',
    logoURL: METAMASK_LOGO_URL,
    connector: metamaskConnector,
    onNoConnector: () => {
      window.open('https://metamask.io/', 'inst_metamask');
    },
  };

  const uniswapWalletConnector = useConnector<UniswapWallet>(initializeUniswapWallet);
  const uniswapWallet: Wallet = {
    type: 'uniswap',
    name: 'Uniswap Wallet',
    logoURL: UNISWAP_WALLET_LOGO_URL,
    connector: uniswapWalletConnector,
    onNoConnector: () => {
      alert('Uniswap Wallet support is coming soon!');
    },
  };

  return [metamask, uniswapWallet];
};

export default useWallets;
