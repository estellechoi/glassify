export enum ChainId {
  ETHEREUM_MAINNET = 1,
}

/**
 *
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#request EIP-1193
 */
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

/**
 *
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#events EIP-1193
 */
export interface Provider {
  request(args: RequestArguments): Promise<unknown>;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
}

export abstract class Connector {
  /**
   *
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md EIP-1193
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md EIP-1102
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md EIP-3085
   */
  public readonly provider: Provider;
  public account?: string;
  protected onError?: (error: Error) => void;

  /**
   *
   * @param provider - A provider object as defined by EIP-1193.
   * @param onError - An optional handler which will report errors thrown from event listeners.
   * Actions are used by the connector to report changes in connection status.
   */
  constructor(provider: Provider, onError?: (error: Error) => void) {
    this.provider = provider;
    this.onError = onError;
  }

  public abstract connect(...args: unknown[]): Promise<Connector | undefined>;
  public abstract disconnect?(...args: unknown[]): Promise<Connector | undefined>;
}

/**
 *
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#rpc-errors EIP-1193
 */
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
