import { useMemo } from 'react'
import { Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { AppConnectors, WalletTypes } from '../connectors'

export const SELECTABLE_WALLETS: WalletTypes[] = [WalletTypes.METAMASK, WalletTypes.WALLET_CONNECT]

const useOrderedConnectors = () => {
  const selectedWallet = WalletTypes.METAMASK

  return useMemo<[Connector, Web3ReactHooks][]>(() => {
    const walletTypes: WalletTypes[] = []
    if (selectedWallet) {
      walletTypes.push(selectedWallet)
    }

    walletTypes.push(...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet))
    return walletTypes.map((walletType) => AppConnectors[walletType])
  }, [selectedWallet])
}

export default useOrderedConnectors
