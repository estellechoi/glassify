/**
 *
 * @see https://github.com/wagmi-dev/references/blob/main/packages/chains/src/mainnet.ts
 */
import { mainnet, type Chain } from '@wagmi/chains';
import { ChainId } from '@/connectors/types';
import { Network, Alchemy } from 'alchemy-sdk';

export const CHAINS_DICT: Record<ChainId, Chain> = {
  [ChainId.ETHEREUM]: mainnet,
};

export const ALCHEMY_API_KEY_DICT: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY ?? '',
};

/**
 *
 * @see https://docs.infura.io/network-endpoints
 */
export const QUERY_ENDPOINTS_DICT: Record<ChainId, { alchemy: string }> = {
  [ChainId.ETHEREUM]: {
    alchemy: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_DICT[ChainId.ETHEREUM]}`,
  },
};

export const WEBSOCKET_ENDPOINTS_DICT: Record<ChainId, { alchemy: string }> = {
  [ChainId.ETHEREUM]: {
    alchemy: `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_DICT[ChainId.ETHEREUM]}`,
  },
};

export const ALCHEMY_NETWORK_DICT: Record<ChainId, Network> = {
  [ChainId.ETHEREUM]: Network.ETH_MAINNET,
};

export const getAlchemy = (chainId: ChainId): Alchemy => {
  return new Alchemy({
    network: ALCHEMY_NETWORK_DICT[chainId],
    apiKey: ALCHEMY_API_KEY_DICT[chainId],
  });
};
