import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useNFTsQuery } from '@/data/hooks';
import type { OwnedNFTData } from '@/data/types';
import type { ConnectedWallet } from '@/types/wallet';
import type { FloorPriceMarketplace } from 'alchemy-sdk/dist/src/types/types';
import type { OwnedNFT } from '@/types/asset';

const useOwnedNFTs = (wallet: ConnectedWallet, refetchInterval = 0) => {
  const { data: ownedNFTsData, isLoading: isOwnedNFTsLoading } = useNFTsQuery({ wallet });

  return useMemo<{ ownedNFTs: readonly OwnedNFT[]; isLoading: boolean }>(() => {
    const ownedNFTs: readonly OwnedNFT[] =
      ownedNFTsData?.map((ownedNFT) => {
        const marketplace = ownedNFT.marketplace as FloorPriceMarketplace | undefined;
        const floorPrice = {
          value: new BigNumber(marketplace?.floorPrice ?? 0),
          symbol: marketplace?.priceCurrency,
        };

        return {
          ...ownedNFT,
          floorPrice,
        };
      }) ?? [];

    return {
      ownedNFTs,
      isLoading: isOwnedNFTsLoading,
    };
  }, [ownedNFTsData, isOwnedNFTsLoading]);
};

export default useOwnedNFTs;
