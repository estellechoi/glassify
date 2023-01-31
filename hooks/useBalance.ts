import { CoinId } from '@/constants/coin';
import { ChainId } from '@/constants/connect';
import { chainBalancesAtom, coinDetailDictAtom } from '@/state/states';
import type { BalanceDetail } from '@/types/account';
import { BigNumber } from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

const useBalance = (chainId: ChainId) => {
  const [chainBalances] = useRecoilState(chainBalancesAtom);
  const [coinDetailDict] = useRecoilState(coinDetailDictAtom);

  const balances = useMemo<BalanceDetail[]>(() => {
    const chainBalance = chainBalances.find((balance) => balance.chainId === chainId);

    return Object.keys(coinDetailDict).map((coinId) => {
      const coinDetail = coinDetailDict[coinId];
      const balance = chainBalance?.balances.find((bal) => bal.denom === coinDetail.denom);

      const amount = new BigNumber(balance?.amount ?? 0).shiftedBy(-coinDetail.decimal);
      const amountFiat = { usd: amount.multipliedBy(coinDetail.priceFiat.usd) };

      return {
        amount,
        amountFiat,
        ...coinDetail,
      };
    });
  }, [chainBalances, chainId, coinDetailDict]);

  const totalBalanceUSD = useMemo<BigNumber>(() => {
    return balances.reduce((sum, bal) => sum.plus(bal.amountFiat.usd), new BigNumber(0));
  }, [balances]);

  const getBalanceByCoinId = useCallback((coinId: CoinId) => balances.find((bal) => bal.coinGeckoId === coinId), [balances]);

  return { balances, totalBalanceUSD, getBalanceByCoinId };
};

export default useBalance;
