import { useCallback, useEffect, useMemo, useState } from 'react';
import LabelText from '@/components/LabelText';
import LoadingRows from '@/components/LoadingRows';
import NFT from '@/components/NFT';
import OverlayGrid from '@/components/OverlayGrid';
import { shortenAddress } from '@/utils/text';
import CaptionText from '@/components/CaptionText';
import NumberText from '@/components/NumberText';
import { formatNumber } from '@/utils/number';
import type { OwnedNFT } from '@/types/asset';
import { TEXT_COLOR_CLASS_DICT } from '@/components/styles';

/**
 *
 * @description this is mock for UI test
 */
// const DUMMY_IMG_URLS = [
//   'https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=136&h=136&fr=1',
//   'https://i.seadn.io/gcs/files/9c43193f74ea66b47c19aa15edd62668.png?auto=format&dpr=1&w=3840',
//   'https://i.seadn.io/gae/fOa919UJ6rfIVTCreSRflN5RvDb7S4dHK17-eX7vLPKYu5nZ2DInXKPp1M_81xiCaFKh7FWctu8jl8pySeQ4u0uRotvleUlzZGyr6kg?auto=format&dpr=1&w=3840',
//   'https://i.seadn.io/gcs/files/190eaea1412f964a4db01360624011f7.png?auto=format&dpr=1&w=3840',
//   'https://i.seadn.io/gcs/files/8b6d9173bd849dae165cfc2e5a38c0db.png?auto=format&dpr=1&w=3840',
//   'https://i.seadn.io/gcs/files/fdad20a44c06012091e282337816eab0.png?auto=format&dpr=1&w=3840',
// ];

type NFTsProps = {
  ownedNFTs: readonly OwnedNFT[];
  isOwnedNFTsLoading: boolean;
};

const NFTs = ({ ownedNFTs, isOwnedNFTsLoading }: NFTsProps) => {
  const isNFTsExpandable = useMemo<boolean>(() => {
    return ownedNFTs.length > 5 ?? false;
  }, [ownedNFTs.length]);

  const getNFTThumbnailURL = useCallback((ownedNFT: OwnedNFT, index: number) => {
    // return index === 0 ? ownedNFT.media[0]?.thumbnail ?? ownedNFT.rawMetadata?.image : DUMMY_IMG_URLS[index - 1];
    return ownedNFT.media[0]?.thumbnail ?? ownedNFT.rawMetadata?.image;
  }, []);

  /**
   *
   * @description to highlight hovered NFT data
   */
  const [hoveredNFT, setHoveredNFT] = useState<OwnedNFT>(ownedNFTs[0]);
  useEffect(() => {
    setHoveredNFT(ownedNFTs[0]);
  }, [ownedNFTs[0]]);

  const colorClassName = TEXT_COLOR_CLASS_DICT.on_primary;

  return (
    <section className="px-1 py-3">
      <LabelText size="sm" text="NFTs" className="mb-3" />

      {isOwnedNFTsLoading ? (
        <>
          <LoadingRows color="on_primary" fontClassName="text-[5rem]" className="w-[1em]" />
          <LoadingRows color="on_primary" fontClassName="text-[1rem]" className="w-[1em] mt-1" />
        </>
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
                  onMouseEnter={() => setHoveredNFT(ownedNFT)}
                  onMouseLeave={() => setHoveredNFT(ownedNFTs[0])}
                />
              </OverlayGrid.Item>
            ))}
          </OverlayGrid>

          {hoveredNFT && (
            <div className="pl-1 mt-1 animate-fade_in_x">
              <CaptionText
                color="on_primary"
                size="xs"
                text={hoveredNFT.rawMetadata?.name ?? shortenAddress(hoveredNFT.contract.address, 4, 4)}
                shadowText={ownedNFTs[1] ? `and ${ownedNFTs.length - 1} more` : undefined}
              />

              {hoveredNFT && (
                <span className="flex items-baseline gap-x-1 -mt-1">
                  <span className={`Font_caption_xs opacity-70 ${colorClassName}`}>Floor</span>
                  <NumberText
                    color="on_primary"
                    size="sm"
                    formattedNumber={formatNumber(hoveredNFT.floorPrice.value, 4)}
                    unit={hoveredNFT.floorPrice.symbol}
                  />
                </span>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NFTs;
