import { atom, selector } from 'recoil';
import { AssetInfoRaw } from '../types/asset';

/** @summary assetInfos */
export const assetInfosAtom = atom<AssetInfoRaw[]>({
  key: 'assetInfos',
  default: [],
});

export const assetCountState = selector<number>({
  key: 'assetCount',
  get: ({ get }) => {
    const assetInfos = get(assetInfosAtom);
    return assetInfos?.length ?? 0;
  },
});

/** @summary watchlist */
export const watchListAtom = atom<AssetInfoRaw[]>({
  key: 'watchList',
  default: []
});
