import type { CoinId } from '@/types/coin';
import Image from 'next/image';
// import AtomSvg from '@/resources/coin_logos/atom.svg';
// import CreSvg from '@/resources/coin_logos/cre.svg';
// import BCreSvg from '@/resources/coin_logos/bcre.svg';
// import LunaSvg from '@/resources/coin_logos/luna.svg';
// import UsdcSvg from '@/resources/coin_logos/usdc.svg';

import { CSSProperties, useCallback, useState } from 'react';

type CoinProps = {
  coinId: CoinId | undefined;
  pxSize?: number;
  className?: string;
  style?: CSSProperties;
};

const Coin = ({ coinId, pxSize = 24, className = '', style }: CoinProps) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const onImgLoad = useCallback(() => setIsImgLoaded(true), []);

  return (
    <div className={`${className} w-fit h-fit object-contain flex justify-center items-center`} style={style}>
      <div
        className="relative rounded-full Bg_skeleton"
        style={{
          width: `${pxSize}px`,
          height: `${pxSize}px`,
        }}
      >
        {coinId !== undefined && (
          <Image
            src={coinId}
            alt={coinId}
            width={pxSize}
            height={pxSize}
            onLoad={onImgLoad}
            className={`transition-opacity ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
    </div>
  );
};

export default Coin;
