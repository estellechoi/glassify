import Image from 'next/image';
import useCoinLogoURL from './useCoinLogoURL';
import { useCallback, useState } from 'react';

export type CoinSize = 'sm' | 'md' | 'lg' | 'xl';

const COIN_SIZE_DICT: Record<CoinSize, { px: number; className: string }> = {
  sm: { px: 16, className: 'w-4 h-4' },
  md: { px: 20, className: 'w-5 h-5' },
  lg: { px: 24, className: 'w-6 h-6' },
  xl: { px: 32, className: 'w-8 h-8' },
};

type CoinProps = {
  symbol?: string;
  size?: CoinSize;
  logoURL?: string;
};

const Coin = ({ symbol, size = 'md', logoURL: injectedLogoURL }: CoinProps) => {
  const logoURL = useCoinLogoURL(symbol);
  const renderingLogoURL = injectedLogoURL ?? logoURL;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const onLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const [isError, setIsError] = useState<boolean>(false);
  const onError = useCallback(() => {
    console.log('error');
    setIsError(true);
  }, []);

  const pxSizes = { width: COIN_SIZE_DICT[size].px, height: COIN_SIZE_DICT[size].px };
  const sizeClassName = COIN_SIZE_DICT[size].className;
  const opacityClassName = `transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`;

  return !isError && renderingLogoURL ? (
    <Image
      alt={`${symbol} logo`}
      src={renderingLogoURL}
      {...pxSizes}
      className={`rounded-full ${sizeClassName} ${opacityClassName}`}
      onLoadingComplete={onLoaded}
      onError={onError}
    />
  ) : (
    <div aria-hidden className={`${sizeClassName} rounded-full animate-pulse`}></div>
  );
};

export default Coin;
