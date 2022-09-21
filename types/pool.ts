import { Address } from 'cluster'

export interface PoolImmutables {
  factory: Address
  token0: Address
  token1: Address
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: number // ethers.BigNumber
}

export interface PoolState {
  liquidity: number // ethers.BigNumber
  sqrtPriceX96: number // ethers.BigNumber
  tick: number
  observationIndex: number
  observationCardinality: number
  observationCardinalityNext: number
  feeProtocol: number
  unlocked: boolean
}
