import MetaMask from '@/connectors/MetaMask';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskSDK, { CommunicationLayerPreference, type MetaMaskSDKOptions } from '@metamask/sdk';
import type { MetaMaskEthereumProvider } from '@/connectors/types';
import { IS_DEV } from '@/constants/app';

/**
 *
 * @description recommend to use this funciton to initialize MetaMask on desktop as fallback
 */
const initializeMetamaskFromSDK = async (): Promise<MetaMask | undefined> => {
  try {
    const SDK_OPTIONS: MetaMaskSDKOptions = {
      logging: { developerMode: IS_DEV },
      dappMetadata: {
        name: 'Paper',
        url: 'https://paper-vert.vercel.app',
      },
      communicationLayerPreference: CommunicationLayerPreference.SOCKET,
      preferDesktop: false,
      useDeeplink: false,
    };

    const metamaskSDK = new MetaMaskSDK(SDK_OPTIONS);

    /**
     *
     * @description open MetaMask app on mobile to get wallet handle
     * but it does so under the hood on desktop, so user may not notice
     */
    await metamaskSDK.init();

    return new MetaMask(metamaskSDK.activeProvider ?? metamaskSDK.getProvider());
  } catch (e: unknown) {
    console.log('MetaMask initialization failed', e);
    return undefined;
  }
};

/**
 *
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/
 * @see https://docs.metamask.io/wallet/reference/sdk-js-options/
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/react/
 */
export const initializeMetamask = async (): Promise<MetaMask | undefined> => {
  const provider: MetaMaskEthereumProvider | null = await detectEthereumProvider();
  // try using the SDK when the provider is not detected from browser
  return provider ? new MetaMask(provider) : initializeMetamaskFromSDK();
};
