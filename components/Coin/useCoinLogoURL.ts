import { ChainId } from '@/connectors/types';
import { useMemo } from 'react';
import EthLogo from '@/resources/coin_logos/ethereum-logo.png';
import { useAtom } from 'jotai';
import { allTokensDictAtom } from '@/store/states';

const useCoinLogoURL = (symbol?: string, chainId?: ChainId) => {
  const [tokensDict] = useAtom(allTokensDictAtom);

  return useMemo<string | undefined>(() => {
    if (!symbol) return EthLogo.src;
    return tokensDict[symbol]?.logoURI;
  }, [symbol, tokensDict]);
};

export default useCoinLogoURL;
