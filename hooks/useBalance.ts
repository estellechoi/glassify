import { CoinId } from '@/constants/coin';
import { ChainId } from '@/constants/connect';
import { balancesDictAtom, coinDetailDictSelector } from '@/state/atoms';
import type { BalanceDetail, ChainBalance } from '@/types/account';
import { BigNumber } from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const useBalance = (chainId?: ChainId) => {
  const [balancesDict] = useRecoilState(balancesDictAtom);
  const coinDetailDict = useRecoilValue(coinDetailDictSelector);

  const getBalancesByChain = useCallback(
    (chainBalance: ChainBalance): BalanceDetail[] => {
      return Object.keys(coinDetailDict).map((coinId) => {
        const coinDetail = coinDetailDict[coinId];
        const balance = chainBalance?.balances?.find((bal) => bal.denom === coinDetail.denom);

        const amount = new BigNumber(balance?.amount ?? 0).shiftedBy(-coinDetail.decimal);
        const amountFiat = { usd: amount.multipliedBy(coinDetail.priceFiat.usd) };

        return {
          onChainId: chainBalance.chainId,
          amount,
          amountFiat,
          ...coinDetail,
        };
      });
    },
    [coinDetailDict]
  );

  const targetChainBalances = useMemo<ChainBalance[]>(
    () => (chainId ? (balancesDict[chainId] ? [balancesDict[chainId]] : []) : Object.values(balancesDict)),
    [balancesDict, chainId]
  );

  const balances = useMemo<BalanceDetail[]>(() => {
    return targetChainBalances.reduce<BalanceDetail[]>((sum, chainBalance) => [...sum, ...getBalancesByChain(chainBalance)], []);
  }, [targetChainBalances, getBalancesByChain]);

  const totalBalanceUSD = useMemo<BigNumber>(() => {
    return balances.reduce((sum, bal) => sum.plus(bal.amountFiat.usd), new BigNumber(0));
  }, [balances]);

  const holdings = useMemo<BalanceDetail[]>(() => {
    return balances.filter((bal) => bal.amount.gt(0));
  }, [balances]);

  const getBalanceByCoinId = useCallback((coinId: CoinId) => balances.find((bal) => bal.coinGeckoId === coinId), [balances]);

  return { balances, holdings, totalBalanceUSD, getBalanceByCoinId };
};

export default useBalance;
