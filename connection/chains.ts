const INFURA_ETH_KEY = process.env.NEXT_PUBLIC_INFURA_ETH_KEY
const INFURA_ETH2_KEY = process.env.NEXT_PUBLIC_INFURA_ETH2_KEY

if (!(INFURA_ETH_KEY && INFURA_ETH2_KEY)) {
  throw new Error(`NEXT_PUBLIC_INFURA_ETH_KEY and NEXT_PUBLIC_INFURA_ETH2_KEY must be defined as env`)
}

export enum ChainIds {
  MAINNET = '1',
  PRATER = '2',
}

// this is dump so the fallback urls must be changed for ethereum2
export const FALLBACK_URLS: { [key in ChainIds]: string[] } = {
  [ChainIds.MAINNET]: ['https://api.mycryptoapi.com/eth'],
  [ChainIds.PRATER]: ['https://rpc.ankr.com/eth_ropsten'],
}

export const RPC_URLS: { [key in ChainIds]: string[] } = {
  [ChainIds.MAINNET]: [`https://mainnet.infura.io/v3/${INFURA_ETH_KEY}`, ...FALLBACK_URLS[ChainIds.MAINNET]],
  [ChainIds.PRATER]: [`https://ropsten.infura.io/v3/${INFURA_ETH_KEY}`, ...FALLBACK_URLS[ChainIds.PRATER]],
}

export const RPC_URLS_2: { [key in ChainIds]: string[] } = {
  [ChainIds.MAINNET]: [`https://${INFURA_ETH2_KEY}@eth2-beacon-mainnet.infura.io`],
  [ChainIds.PRATER]: [`https://${INFURA_ETH2_KEY}@eth2-beacon-prater.infura.io`],
}
