import { useTokensQuery } from '@/data/hooks';
import { allTokensDictAtom } from '@/store/states';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useSetupTokens = () => {
  const [, setTokensDict] = useAtom(allTokensDictAtom);

  const { data: tokensData } = useTokensQuery();

  useEffect(() => {
    const dict =
      tokensData?.tokens.reduce((acc, token) => {
        return { ...acc, [token.symbol]: token };
      }, {}) ?? {};

    setTokensDict(dict);
  }, [tokensData]);
};

export default useSetupTokens;
