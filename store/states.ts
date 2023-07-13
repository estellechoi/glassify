import { atom } from 'jotai';
import { LOCAL_STORAGE_KEYS } from '@/constants/app';
import type { Wallet } from '@/types/wallet';

export const userWalletAtomOrigin = atom<Wallet | null>(null);

export const userWalletAtom = atom(
  (get) => get(userWalletAtomOrigin),
  (_, set, userWallet: Wallet | null) => {
    set(userWalletAtomOrigin, userWallet);

    if (userWallet?.type) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_USED_WALLET, userWallet.type);
    }
  }
);
