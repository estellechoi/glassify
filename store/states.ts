import { atom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import type { ConnectedWallet } from '@/types/wallet';
import type { UniswapTokenData } from '@/data/types';

/**
 *
 * @description token symbol is used as key atm; should be replaced with contract address
 */
export const allTokensDictAtom = atom<Record<string, UniswapTokenData>>({});

const userWalletAtomOrigin = atom<ConnectedWallet | null>(null);

export const userWalletAtom = atom(
  (get) => get(userWalletAtomOrigin),
  (_, set, userWallet: ConnectedWallet | null) => {
    set(userWalletAtomOrigin, userWallet);

    if (userWallet?.type) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET, userWallet.type);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET);
    }
  }
);

export const userAgentAtom = atom<
  { isMobile: boolean; isMobileOrTablet: boolean; isIOS: boolean; isNonIOSMobile: boolean } | undefined
>(undefined);
