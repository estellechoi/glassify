import { Currency, Token } from '@uniswap/sdk-core'
import { FeeAmount, Pool } from '@uniswap/v3-sdk'
import { useCallback, useMemo } from 'react'
import { DEXs, POOL_ADDR } from '../constants/addresses'
import { ethers } from 'ethers'
import { RpcProviders } from '../connection/providers'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

import { ChainIds } from '../connection/chains'
import { PoolImmutables, PoolState } from '../types/pool'

export enum Status {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

// tmp
const chainId = ChainIds.MAINNET
const provider = RpcProviders[chainId]
const poolAddr = POOL_ADDR[DEXs.UNISWAP_V3]
const poolContract = new ethers.Contract(poolAddr, IUniswapV3PoolABI, provider)

export const getPoolImmutables = async (): Promise<PoolImmutables> => {
  return {
    factory: await poolContract.factory(),
    token0: await poolContract.token0(),
    token1: await poolContract.token1(),
    fee: await poolContract.fee(),
    tickSpacing: await poolContract.tickSpacing(),
    maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
  }
}

export const getPoolState = async (): Promise<PoolState> => {
  const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()])
  return {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  }
}

const getPoolFactory = async () => {
  const poolImmutables = await getPoolImmutables()
  return poolImmutables.factory
}

console.log('factory', getPoolFactory())

const usePools = (
  poolKeys: [Currency | undefined, Currency | undefined, FeeAmount | undefined][]
): [Status, Pool | null][] => {
  const poolTokens = useMemo<([Token, Token, FeeAmount] | undefined)[]>(() => {
    return poolKeys.map(([currencyA, currencyB, feeAmount]) => {
      if (currencyA && currencyB && feeAmount) {
        const tokenA = currencyA.wrapped
        const tokenB = currencyB.wrapped
        if (tokenA.equals(tokenB)) return undefined

        return tokenA.sortsBefore(tokenB) ? [tokenA, tokenB, feeAmount] : [tokenB, tokenA, feeAmount]
      }
      return undefined
    })
  }, [poolKeys])

  return useMemo(() => {
    return poolKeys.map((_key, index) => {
      const tokens = poolTokens[index]
      if (tokens === undefined) return [Status.INVALID, null]

      return [Status.NOT_EXISTS, null]
    })
  }, [poolKeys, poolTokens])
}

export default usePools
