import { atom, RecoilEnv } from 'recoil';
import type { ChainBalance, Wallet } from '@/types/account';
import { CoinCeckoCoinDetail, CoinId } from '@/types/coin';

/**
 * @summary recoil atom key dupl warning issue resolved by Recoil team
 * https://github.com/facebookexperimental/Recoil/pull/2046/commits/95b345605b5ff015e98bb5185d433310908b34d3
 * */
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const walletAtom = atom<Wallet | undefined>({
  key: 'wallet',
  default: undefined,
});

export const coinsDictAtom = atom<Record<CoinId, CoinCeckoCoinDetail> | {}>({
  key: 'coinPriceDict',
  default: {},
});

/** @wip refactor of above */
export const balancesDictAtom = atom<Record<string, ChainBalance>>({
  key: 'chainBalancesDict',
  default: {},
});
