import MetaMask, { type MetaMaskProvider } from '@/connectors/MetaMask';
import detectEthereumProvider from '@metamask/detect-provider';

export const initializeMetamask = async (
  options?: Parameters<typeof detectEthereumProvider>[0]
): Promise<MetaMask | undefined> => {
  const provider = (await detectEthereumProvider(options)) as MetaMaskProvider | null;
  if (!provider) throw new Error('MetaMask not found');

  // handle when e.g. metamask and coinbase wallet are both installed
  if (provider.providers?.length) {
    const metamask = provider.providers.find((p) => p.isMetaMask) ?? null;
    if (!metamask) throw new Error('MetaMask not found');

    return new MetaMask(metamask);
  }

  if (!provider.isMetaMask) throw new Error('MetaMask not found');

  return new MetaMask(provider);
};
