import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BlockProvider from '../providers/BlockProvider'
import Web3Provider from '../providers/Web3Provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <BlockProvider>
        <Component {...pageProps} />
      </BlockProvider>
    </Web3Provider>
  )
}

export default MyApp
