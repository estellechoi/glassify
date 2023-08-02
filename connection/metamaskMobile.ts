import MetaMask from '@/connectors/MetaMask';
import type { MetaMaskEthereumProvider } from '@/connectors/types';
import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskSDK, { CommunicationLayerPreference, type MetaMaskSDKOptions } from '@metamask/sdk';

const initializeMetamaskFromSDK = async (): Promise<MetaMask | undefined> => {
  try {
    const SDK_OPTIONS: MetaMaskSDKOptions = {
      dappMetadata: {
        name: 'Paper',
        url: 'https://paper-vert.vercel.app',
      },
      communicationLayerPreference: CommunicationLayerPreference.SOCKET,
      preferDesktop: false,
    };

    const metamaskSDK = new MetaMaskSDK(SDK_OPTIONS);
    await metamaskSDK.init();

    const provider = metamaskSDK.activeProvider;
    return provider ? new MetaMask(provider) : undefined;
  } catch (e: unknown) {
    return undefined;
  }
};

/**
 *
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/
 * @see https://docs.metamask.io/wallet/reference/sdk-js-options/
 * @see https://docs.metamask.io/wallet/how-to/use-sdk/javascript/react/
 */
export const initializeMetamaskMobile = async (): Promise<MetaMask | undefined> => {
  const provider: MetaMaskEthereumProvider | null = await detectEthereumProvider();
  // try using the SDK when the provider is not detected from browser
  return provider ? new MetaMask(provider) : initializeMetamaskFromSDK();
};
