import { atom, RecoilEnv, selector } from 'recoil';
import type { ChainBalance, Wallet } from '@/types/account';
import type { CoinDetail, CoinDetailDict, CoinPriceDict } from '@/types/coin';
import { COIN_DETAIL_DICT, CoinId } from '@/constants/coin';

/**
 * @summary recoil atom key dupl warning issue resolved by Recoil team
 * https://github.com/facebookexperimental/Recoil/pull/2046/commits/95b345605b5ff015e98bb5185d433310908b34d3
 * */
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const walletAtom = atom<Wallet | undefined>({
  key: 'wallet',
  default: undefined,
});

export const coinPriceDictAtom = atom<CoinPriceDict>({
  key: 'coinPriceDict',
  default: {},
});

export const chainBalancesAtom = atom<ChainBalance[]>({
  key: 'chainBalances',
  default: [],
});

/** @wip refactor of above */
export const balancesDictAtom = atom<Record<string, ChainBalance>>({
  key: 'chainBalancesDict',
  default: {},
});

/** @description selectors */
export const coinDetailDictSelector = selector({
  key: 'coinDetailDict',
  get: ({ get }) => {
    const coinPriceDict = get(coinPriceDictAtom);

    const coinDetails = Object.keys(coinPriceDict).map<[CoinId, CoinDetail]>((coinId) => {
      const coinDetail = COIN_DETAIL_DICT[coinId as CoinId];
      return [
        coinId as CoinId,
        {
          denom: coinDetail.denom,
          ticker: coinDetail.ticker,
          coinGeckoId: coinId as CoinId,
          decimal: coinDetail.decimal,
          priceFiat: coinPriceDict[coinId],
        },
      ];
    });

    return Object.fromEntries(new Map(coinDetails));
  },
});
