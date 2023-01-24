import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { RPC_URLS } from './chains';

// initialization
const [metamask, metamaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError: onConnectorInitError })
);
const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) => new WalletConnect({ actions, options: { rpc: RPC_URLS, qrcode: true }, onError: onConnectorInitError })
);

export enum WalletTypes {
  METAMASK = 'METAMASK',
  WALLET_CONNECT = 'WALLET_CONNECT',
}

export const AppConnectors: { [key in WalletTypes]: [Connector, Web3ReactHooks] } = {
  [WalletTypes.METAMASK]: [metamask, metamaskHooks],
  [WalletTypes.WALLET_CONNECT]: [walletConnect, walletConnectHooks],
};

function onConnectorInitError(error: Error) {
  console.debug(`web3-react connector initialization error`, error);
}
