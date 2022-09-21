// import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
// import { ChainIds } from '../connection/chains'

// const V3_CORE_FACTORY_ADDRESSES: { [key in ChainIds]: string } = {
//   [ChainIds.MAINNET]: V3_FACTORY_ADDRESS,
//   [ChainIds.PRATER]: V3_FACTORY_ADDRESS,
// }

export enum DEXs {
  UNISWAP_V3,
}

export const POOL_ADDR: { [key in DEXs]: string } = {
  [DEXs.UNISWAP_V3]: '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8',
}
