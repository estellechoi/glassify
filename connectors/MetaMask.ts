import { ChainId, Connector, type EthAddress, Provider, ProviderRpcError } from '@/connectors/types';

/**
 *
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md#parameters EIP-3085
 */
export interface AddEthereumChainParameter {
  chainId: ChainId;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export type MetaMaskProvider = Provider & {
  isMetaMask: boolean;
  isConnected?: () => boolean;
  // to handle when e.g. metamask and coinbase wallet are both installed
  providers?: readonly MetaMaskProvider[];
  get chainId(): string;
  get accounts(): string[];
};

class MetaMask extends Connector {
  public provider: MetaMaskProvider;

  constructor(provider: MetaMaskProvider, onError?: (error: Error) => void) {
    super(provider, onError);
    this.provider = provider;
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  public get chainId(): ChainId {
    return Number.parseInt(this.provider.chainId, 16);
  }

  public async connect(chainIdOrChainParams?: ChainId | AddEthereumChainParameter): Promise<MetaMask | undefined> {
    const accounts: readonly string[] = (await this.provider.request({ method: 'eth_requestAccounts' })) as string[];

    if (!accounts.length) {
      this.onError?.(new Error('No accounts returned'));
      return undefined;
    }

    this.account = accounts[0] as EthAddress;

    const detectedChainId = Number.parseInt((await this.provider.request({ method: 'eth_chainId' })) as string, 16);
    const desiredChainId = typeof chainIdOrChainParams === 'number' ? chainIdOrChainParams : chainIdOrChainParams?.chainId;

    if (!desiredChainId || detectedChainId === desiredChainId) {
      return this;
    }

    const desiredChainIdHex = `0x${desiredChainId.toString(16)}`;

    this.provider
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: desiredChainIdHex }],
      })
      .catch(async (error: ProviderRpcError) => {
        const errorCode = (error.data as any)?.originalError?.code ?? error.code;

        // 4902: the chain has not been added to MetaMask and wallet_addEthereumChain needs to be called
        if (errorCode === 4902) {
          const addEthereumChainParams =
            typeof chainIdOrChainParams !== 'number' ? [{ ...chainIdOrChainParams, chainId: desiredChainIdHex }] : undefined;

          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: addEthereumChainParams,
          });

          this.connect(addEthereumChainParams ? desiredChainId : undefined);
        }

        this.onError?.(error);
      })
      .then(() => {
        this.connect(desiredChainId);
      });

    return undefined;
  }

  public async disconnect(): Promise<void> {
    this.account = undefined;
  }
}

export default MetaMask;
