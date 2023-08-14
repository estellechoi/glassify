import { ChainId, Connector, type Provider } from '@/connectors/types';

class UniswapWallet extends Connector {
  constructor(provider: Provider, onError?: (error: Error) => void) {
    super(provider, onError);
  }

  public get chainId(): ChainId {
    return ChainId.ETHEREUM;
  }

  public async connect(): Promise<null> {
    return null;
  }

  public async disconnect(): Promise<void> {}
}

export default UniswapWallet;
