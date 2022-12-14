import { atom, RecoilEnv } from 'recoil';
import { Coin } from '@/types/coin';

/**
 * @summary recoil atom key dupl warning issue resolved by Recoil team
 * https://github.com/facebookexperimental/Recoil/pull/2046/commits/95b345605b5ff015e98bb5185d433310908b34d3
 * */
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

/** @summary assetInfos */
export const coinsAtom = atom<Coin[]>({
  key: 'coins',
  default: [],
});

// export const assetCountState = selector<number>({
//   key: 'assetCount',
//   get: ({ get }) => {
//     const assetInfos = get(coinsAtom);
//     return assetInfos?.length ?? 0;
//   },
// });

/** @summary watchlist */
export const watchListAtom = atom<Coin[]>({
  key: 'watchList',
  default: []
});
