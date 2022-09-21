import { ChainIds, RPC_URLS } from './chains'
import { ethers } from 'ethers'

export const RpcProviders: { [key in ChainIds]: ethers.providers.JsonRpcProvider } = {
  [ChainIds.MAINNET]: new ethers.providers.JsonRpcProvider(RPC_URLS[ChainIds.MAINNET][0]),
  [ChainIds.PRATER]: new ethers.providers.JsonRpcProvider(RPC_URLS[ChainIds.PRATER][0]),
}
