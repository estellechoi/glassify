import Image from 'next/image';
import useCoinLogoURL from './useCoinLogoURL';
import { useCallback, useState } from 'react';

type CoinSize = 'md';

const COIN_SIZE_DICT: Record<CoinSize, { px: number; className: string }> = {
  md: { px: 20, className: 'w-5 h-5' },
};

type CoinProps = {
  symbol?: string;
  size?: CoinSize;
};

const Coin = ({ symbol, size = 'md' }: CoinProps) => {
  const logoURL = useCoinLogoURL(symbol);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const onLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const [isError, setIsError] = useState<boolean>(false);
  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  const pxSizes = { width: COIN_SIZE_DICT[size].px, height: COIN_SIZE_DICT[size].px };
  const sizeClassName = COIN_SIZE_DICT[size].className;
  const opacityClassName = `transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`;

  return !isError && logoURL ? (
    <Image
      alt={`${symbol} logo`}
      src={logoURL}
      {...pxSizes}
      className={`${sizeClassName} ${opacityClassName}`}
      onLoadingComplete={onLoaded}
      onError={onError}
    />
  ) : (
    <div aria-hidden className={`${sizeClassName} rounded-full animate-pulse`}></div>
  );
};

export default Coin;
