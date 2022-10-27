import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { Suspense } from 'react';
import BlockProvider from '../providers/BlockProvider';
import Web3Provider from '../providers/Web3Provider';
import queryClient from '../data/queryClient';
import ErrorBoundary from '../components/ErrorBoundary';
import Fallback from './fallback';

function MyApp({ Component, pageProps }: AppProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackComponent={Fallback} onReset={reset}>
        <Suspense>
          <Web3Provider>
            <BlockProvider>
              <Component {...pageProps} />
            </BlockProvider>
          </Web3Provider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
