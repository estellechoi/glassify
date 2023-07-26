import { useCallback, useMemo, useState } from 'react';
import LabelText from '@/components/LabelText';
import LoadingRows from '@/components/LoadingRows';
import NFT from '@/components/NFT';
import OverlayGrid from '@/components/OverlayGrid';
import { useNFTFloorPriceQuery, useNFTsQuery } from '@/data/hooks';
import BigNumber from 'bignumber.js';
import { shortenAddress } from '@/utils/text';
import CaptionText from '@/components/CaptionText';
import NumberText from '@/components/NumberText';
import { formatNumber } from '@/utils/number';
import type { ConnectedWallet } from '@/types/wallet';
import type { OwnedNFTData } from '@/data/types';
import { FloorPriceMarketplace } from 'alchemy-sdk/dist/src/types/types';

/**
 *
 * @description this is mock for UI test
 */
const DUMMY_IMG_URLS = [
  'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=136&h=136&fr=1',
  'https://i.seadn.io/gcs/files/9c43193f74ea66b47c19aa15edd62668.png?auto=format&dpr=1&w=3840',
  'https://i.seadn.io/gae/fOa919UJ6rfIVTCreSRflN5RvDb7S4dHK17-eX7vLPKYu5nZ2DInXKPp1M_81xiCaFKh7FWctu8jl8pySeQ4u0uRotvleUlzZGyr6kg?auto=format&dpr=1&w=3840',
  'https://i.seadn.io/gcs/files/190eaea1412f964a4db01360624011f7.png?auto=format&dpr=1&w=3840',
  'https://i.seadn.io/gcs/files/8b6d9173bd849dae165cfc2e5a38c0db.png?auto=format&dpr=1&w=3840',
  'https://i.seadn.io/gcs/files/fdad20a44c06012091e282337816eab0.png?auto=format&dpr=1&w=3840',
];

const useNFTFloorPrice = (wallet: ConnectedWallet, initialContractAddress?: string) => {
  const [contractAddress, setContractAddress] = useState<string | undefined>(initialContractAddress);

  const { data: ownedNFTFloorPriceData } = useNFTFloorPriceQuery({
    wallet,
    contractAddress,
  });

  const floorPrice = useMemo<{ amount: BigNumber; symbol?: string }>(() => {
    const data = ownedNFTFloorPriceData as FloorPriceMarketplace | undefined;

    return {
      amount: new BigNumber(data?.floorPrice ?? 0),
      symbol: data?.priceCurrency,
    };
  }, [ownedNFTFloorPriceData]);

  return {
    setContractAddress,
    floorPrice,
  };
};

const NFTs = ({ wallet }: { wallet: ConnectedWallet }) => {
  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useNFTsQuery({ wallet });

  const getNFTThumbnailURL = useCallback((ownedNFT: OwnedNFTData, index: number) => {
    return index === 0 ? ownedNFT.media[0]?.thumbnail ?? ownedNFT.rawMetadata?.image : DUMMY_IMG_URLS[index - 1];
  }, []);

  const isNFTsExpandable = useMemo<boolean>(() => {
    return (ownedNFTs && ownedNFTs.length > 5) ?? false;
  }, [ownedNFTs]);

  /**
   *
   * @description show floor price of hovered NFT
   */
  const initialNFTContractAddress = ownedNFTs?.[0]?.contract.address;
  const { setContractAddress: setHoveredNFTAddress, floorPrice } = useNFTFloorPrice(wallet, initialNFTContractAddress);

  return (
    <section className="px-1 py-3">
      <LabelText size="sm" text="NFTs" className="mb-3" />

      {isOwnedNFTsLoading ? (
        <LoadingRows rowsCnt={1} fontClassName="text-[80px]" />
      ) : (
        <>
          <OverlayGrid xUnitPx={32} isExpandable={isNFTsExpandable}>
            {ownedNFTs?.map((ownedNFT, index) => (
              <OverlayGrid.Item key={ownedNFT.contract.address}>
                <NFT
                  key={ownedNFT.contract.address}
                  name={ownedNFT.rawMetadata?.name}
                  mediaFormat={ownedNFT.media[0]?.format}
                  thumbnailURL={getNFTThumbnailURL(ownedNFT, index)}
                  onMouseEnter={() => setHoveredNFTAddress(ownedNFT.contract.address)}
                  onMouseLeave={() => setHoveredNFTAddress(initialNFTContractAddress)}
                />
              </OverlayGrid.Item>
            ))}
          </OverlayGrid>

          {ownedNFTs?.[0] && (
            <div className="pl-1 mt-1">
              <CaptionText
                size="xs"
                text={ownedNFTs[0].rawMetadata?.name ?? shortenAddress(ownedNFTs[0].contract.address, 4, 4)}
                shadowText={ownedNFTs[1] ? `and ${ownedNFTs.length - 1} more` : undefined}
              />

              <span className="flex items-baseline gap-x-1 -mt-1">
                <span className="Font_caption_xs text-white_o70">Floor</span>
                <NumberText size="sm" formattedNumber={formatNumber(floorPrice.amount, 4)} unit={floorPrice.symbol} />
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NFTs;
