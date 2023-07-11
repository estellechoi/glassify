import { Window as KeplrWindow } from '@keplr-wallet/types';

interface MetaMaskWindow {
  ethereum?: any;
}

declare global {
  interface Window extends KeplrWindow, MetaMaskWindow {}
}
