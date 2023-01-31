import { ChainId } from './connect';

export enum CoinId {
  ATOM = 'cosmos',
  CRE = 'crescent-network',
  BCRE = 'liquid-staking-crescent',
  LUNA = 'terra-luna-2',
  USDC = 'usd-coin',
}

export const COIN_DETAIL_DICT: { [key in CoinId]: { denom: string; ticker: string; decimal: number; chainId: ChainId } } = {
  [CoinId.ATOM]: {
    denom: 'uatom',
    ticker: 'ATOM',
    decimal: 6,
    chainId: ChainId.COSMOS,
  },
  [CoinId.CRE]: {
    denom: 'ucre',
    ticker: 'CRE',
    decimal: 6,
    chainId: ChainId.CRESCENT,
  },
  [CoinId.BCRE]: {
    denom: 'ubcre',
    ticker: 'BCRE',
    decimal: 6,
    chainId: ChainId.CRESCENT,
  },
  [CoinId.LUNA]: {
    denom: 'uluna',
    ticker: 'LUNA',
    decimal: 6,
    chainId: ChainId.TERRA,
  },
  /** @todo this is dummy tmp */
  [CoinId.USDC]: {
    denom: 'usdc',
    ticker: 'USDC',
    decimal: 6,
    chainId: ChainId.ETHEREUM,
  },
};
