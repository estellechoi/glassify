/**
 *
 * @see https://github.com/wagmi-dev/references/blob/main/packages/chains/src/mainnet.ts
 */
import { mainnet, type Chain } from '@wagmi/chains';
import { ChainId } from '@/connectors/types';

export const CHAINS_DICT: Record<ChainId, Chain> = {
  [ChainId.ETHEREUM]: mainnet,
};
