import MetaMask from '@/connectors/MetaMask';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskSDK, { CommunicationLayerPreference, type MetaMaskSDKOptions } from '@metamask/sdk';
import { IS_DEV } from '@/constants/app';
import type { MetaMaskEthereumProvider } from '@/connectors/types';

type InitializeMetaMaskOptions = {
  onError?: () => void;
};

/**
 *
 * @description recommend to use this funciton to initialize MetaMask on desktop as fallback
 */
const initializeMetamaskFromSDK = async (options?: InitializeMetaMaskOptions): Promise<MetaMask | null> => {
  try {
    const SDK_OPTIONS: MetaMaskSDKOptions = {
      logging: { developerMode: IS_DEV },
      dappMetadata: {
        name: 'Paper',
        // url: 'https://paper-vert.vercel.app',
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

    /**
     *
     * @todo handle the case user dismisses sdk modal.
     */
    const provider = metamaskSDK.activeProvider ?? metamaskSDK.getProvider();
    return provider.isMetaMask
      ? new MetaMask(provider, {
          onError: () => {
            metamaskSDK.terminate();
            options?.onError?.();
          },
        })
      : null;
    // return null;
  } catch (e: unknown) {
    console.log('MetaMask initialization failed', e);
    return null;
  }
};

/**
 *
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/
 * @see https://docs.metamask.io/wallet/reference/sdk-js-options/
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/react/
 */
export const initializeMetamask = async (options?: InitializeMetaMaskOptions): Promise<MetaMask | null> => {
  const provider: MetaMaskEthereumProvider | null = await detectEthereumProvider();
  // try using the SDK when the provider is not detected from browser
  return provider?.isMetaMask ? new MetaMask(provider, { onError: options?.onError }) : initializeMetamaskFromSDK(options);
};
