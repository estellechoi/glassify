import { createContext, useMemo, ReactNode, useState, useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

export const BlockContext = createContext<{ value: number }>({ value: 0 })

export default function BlockNumberProvider({ children }: { children: ReactNode }) {
  const { chainId, provider } = useWeb3React()
  const [block, setBlock] = useState<number>(0)

  const onBlock = useCallback(
    (newBlock: number) => {
      if (block > 0 && block < newBlock) {
        setBlock(newBlock)
      }
    },
    [block, setBlock]
  )

  useEffect(() => {
    if (provider) {
      provider.on('block', onBlock)

      return () => {
        provider.removeListener('block', onBlock)
      }
    }
  }, [provider, onBlock])

  const value = useMemo<{ value: number }>(
    () => ({
      value: block,
    }),
    [block]
  )

  return <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
}
