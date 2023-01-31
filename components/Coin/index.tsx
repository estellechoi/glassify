import Image from 'next/image';
import AtomSvg from '@/resources/coin_logos/atom.svg';
import CreSvg from '@/resources/coin_logos/cre.svg';
import BCreSvg from '@/resources/coin_logos/bcre.svg';
import LunaSvg from '@/resources/coin_logos/luna.svg';
import UsdcSvg from '@/resources/coin_logos/usdc.svg';

import { CoinId } from '@/constants/coin';

const IMAGE_SRC_DICT: { [key in CoinId]: string } = {
  [CoinId.ATOM]: AtomSvg,
  [CoinId.CRE]: CreSvg,
  [CoinId.BCRE]: BCreSvg,
  [CoinId.LUNA]: LunaSvg,
  [CoinId.USDC]: UsdcSvg,
};

const Coin = ({ coinId, pxSize = 24 }: { coinId: CoinId | undefined; pxSize?: number }) => {
  return (
    <div className="w-fit h-fit object-contain flex justify-center items-center">
      {coinId ? (
        <Image src={IMAGE_SRC_DICT[coinId]} alt={coinId} width={pxSize} height={pxSize} />
      ) : (
        <div
          className="rounded-full bg-gray-300"
          style={{
            width: `${pxSize}px`,
            height: `${pxSize}px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default Coin;
