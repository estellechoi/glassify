import type { SDKProvider } from '@metamask/sdk';

export enum ChainId {
  ETHEREUM = 1,
}

export type EthAddress = `0x${string}`;

export type EthAccount = {
  address: EthAddress;
};

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
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#rpc-errors EIP-1193
 */
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
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

/**
 *
 * @see https://github.com/MetaMask/detect-provider/blob/main/src/index.ts
 */
export interface MetaMaskEthereumProvider extends Provider {
  isMetaMask?: boolean;
  get chainId(): string | undefined;
  handleDisconnect: undefined;
  once: (eventName: string | symbol, listener: (...args: any[]) => void) => void;
  off: (eventName: string | symbol, listener: (...args: any[]) => void) => void;
  addListener: (eventName: string | symbol, listener: (...args: any[]) => void) => void;
  removeAllListeners: (event?: string | symbol) => void;
}

export type MetaMaskSDKProvider = SDKProvider;

export abstract class Connector {
  /**
   *
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md EIP-1193: JavaScript Ethereum Provider API
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md EIP-1102: Opt-in account exposure
   * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md EIP-3085: Wallet Add Ethereum Chain RPC Method
   */
  public readonly provider: Provider;
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

  public abstract get chainId(): ChainId;
  public abstract connect(...args: unknown[]): Promise<EthAccount | undefined>;
  public abstract disconnect(...args: unknown[]): Promise<void>;
}
