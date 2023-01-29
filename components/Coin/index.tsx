import Image from 'next/image';
import Atom from '@/resources/coin_logos/atom.svg';

type CoinType = 'atom';

const IMAGE_SRC_DICT: { [key in CoinType]: string } = {
  atom: Atom,
};

const Coin = ({ type, pxSize = 24 }: { type: CoinType; pxSize?: number }) => {
  return (
    <div className="w-fit h-fit object-contain flex justify-center items-center">
      <Image src={IMAGE_SRC_DICT[type]} alt={type} width={pxSize} height={pxSize} />
    </div>
  );
};

export default Coin;
