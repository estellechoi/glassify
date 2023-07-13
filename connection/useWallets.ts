import useConnector from './useConnector';
import { initializeMetamask } from './metamask';
import METAMASK_LOGO_URL from '@/resources/images/wallet_metamask.svg';
import UNISWAP_WALLET_LOGO_URL from '@/resources/images/wallet_uniswap.svg';
import { initializeUniswapWallet } from '@/connection/uniswapWallet';
import type MetaMask from '@/connectors/MetaMask';
import type UniswapWallet from '@/connectors/UniswapWallet';
import type { Wallet } from '@/types/wallet';

const useWallets = (): readonly Wallet[] => {
  const metamaskConnector = useConnector<MetaMask>(initializeMetamask);

  const metamask: Wallet = {
    type: 'metamask',
    name: 'MetaMask',
    logoUrl: METAMASK_LOGO_URL,
    connector: metamaskConnector,
    onNoConnector: () => {
      window.open('https://metamask.io/', 'inst_metamask');
    },
  };

  const uniswapWalletConnector = useConnector<UniswapWallet>(initializeUniswapWallet);

  const uniswapWallet: Wallet = {
    type: 'uniswap',
    name: 'Uniswap Wallet',
    logoUrl: UNISWAP_WALLET_LOGO_URL,
    connector: uniswapWalletConnector,
    onNoConnector: () => {},
  };

  return [metamask, uniswapWallet];
};

export default useWallets;
