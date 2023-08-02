import {
  ChainId,
  Connector,
  type EthAddress,
  ProviderRpcError,
  EthAccount,
  MetaMaskSDKProvider,
  MetaMaskEthereumProvider,
} from '@/connectors/types';

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

type MetaMastParamOptions = { onError?: (error: Error) => void };

class MetaMask extends Connector {
  public provider: MetaMaskEthereumProvider | MetaMaskSDKProvider;

  constructor(provider: MetaMaskEthereumProvider | MetaMaskSDKProvider, options?: MetaMastParamOptions) {
    const { onError } = options ?? { onDisconnect: undefined, onError: undefined };

    super(provider, onError);
    this.provider = provider;
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    if (onError)
      this.provider.on('disconnect', () => {
        this.onError?.(new Error('MetaMask disconnected'));
      });
  }

  public get chainId(): ChainId {
    const providerChainId = this.provider.chainId ?? String(ChainId.ETHEREUM);
    return Number.parseInt(providerChainId, 16);
  }

  public async connect(chainIdOrChainParams?: ChainId | AddEthereumChainParameter): Promise<EthAccount | undefined> {
    const addresses: readonly EthAddress[] = (await this.provider.request({ method: 'eth_requestAccounts' })) as EthAddress[];
    const address: EthAddress | undefined = addresses[0];

    if (!address) {
      this.onError?.(new Error('No accounts returned'));
      return undefined;
    }

    const detectedChainId = Number.parseInt((await this.provider.request({ method: 'eth_chainId' })) as string, 16);
    const desiredChainId = typeof chainIdOrChainParams === 'number' ? chainIdOrChainParams : chainIdOrChainParams?.chainId;

    if (!desiredChainId || detectedChainId === desiredChainId) {
      return { address };
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
    this.provider.handleDisconnect?.({ terminate: true });
  }
}

export default MetaMask;
