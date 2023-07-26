import type { ChainId, EthAddress } from '@/connectors/types';
import type { NftContract } from 'alchemy-sdk/dist/src/api/nft';
import type { OwnedNft } from 'alchemy-sdk/dist/src/types/types';
import type BigNumber from 'bignumber.js';

export type UniswapTokenData = Readonly<{
  chainId: ChainId;
  address: EthAddress;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions?: {
    bridgeInfo?: {
      [key: string]: {
        tokenAddress: string;
      };
    };
  };
}>;

export type UniswapTokensData = Readonly<{
  name: string;
  timestamp: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  logoURI: string;
  keywords: string[];
  tokens: readonly UniswapTokenData[];
}>;

export type BalanceData = Readonly<{
  tokenAddress?: EthAddress;
  value: BigNumber;
  decimals: number;
  symbol: string;
}>;

export type OwnedNFTData = Readonly<OwnedNft & { metadata: NftContract }>;
