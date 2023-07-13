import { Connector, type Provider } from '@/connectors/types';

class UniswapWallet extends Connector {
  constructor(provider: Provider, onError?: (error: Error) => void) {
    super(provider, onError);
  }
  public async connect(): Promise<undefined> {
    return undefined;
  }
  public async disconnect(): Promise<void> {}
}

export default UniswapWallet;
