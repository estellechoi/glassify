import { atom, selector } from 'recoil';
import { AssetInfoRaw } from '../types/asset';

/** @summary assetInfos */
export const assetInfosAtom = atom<AssetInfoRaw[]>({
  // recoil atom duplicate key issue in next
  // https://github.com/facebookexperimental/Recoil/issues/733
  key: `assetInfos${new Date().toString()}`,
  default: [],
});

export const assetCountState = selector<number>({
  key: `assetCount${new Date().toString()}`,
  get: ({ get }) => {
    const assetInfos = get(assetInfosAtom);
    return assetInfos?.length ?? 0;
  },
});

/** @summary watchlist */
export const watchListAtom = atom<AssetInfoRaw[]>({
  key: `watchList${new Date().toString()}`,
  default: []
});
