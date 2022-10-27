import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import BlockProvider from '../providers/BlockProvider';
import Web3Provider from '../providers/Web3Provider';
import queryClient from '../data/queryClient';
import ErrorBoundary from '../components/ErrorBoundary';
import Fallback from '../components/Fallback';
import StateUpdater from '../state/StateUpdater';

function MyApp({ Component, pageProps }: AppProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary fallbackComponent={Fallback} onReset={reset}>
      <Suspense>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <StateUpdater />
            <Web3Provider>
              <BlockProvider>
                <Component {...pageProps} />
              </BlockProvider>
            </Web3Provider>
          </QueryClientProvider>
        </RecoilRoot>
      </Suspense>
    </ErrorBoundary>
  );
}

export default MyApp;
