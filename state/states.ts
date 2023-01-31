import { atom, RecoilEnv } from 'recoil';
import type { ChainBalance, Wallet } from '@/types/account';
import { CoinDetailDict } from '@/types/coin';

/**
 * @summary recoil atom key dupl warning issue resolved by Recoil team
 * https://github.com/facebookexperimental/Recoil/pull/2046/commits/95b345605b5ff015e98bb5185d433310908b34d3
 * */
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const walletAtom = atom<Wallet | undefined>({
  key: 'wallet',
  default: undefined,
});

export const coinDetailDictAtom = atom<CoinDetailDict>({
  key: 'coinDetailDict',
  default: {},
});

export const chainBalancesAtom = atom<ChainBalance[]>({
  key: 'chainBalances',
  default: [],
});
