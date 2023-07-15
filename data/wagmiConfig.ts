import { createConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { CHAINS_DICT } from './constants';
import { ChainId } from '@/connectors/types';

export const getWagmiConfig = (chainId: ChainId) =>
  createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: CHAINS_DICT[chainId],
      transport: http(),
    }),
  });
