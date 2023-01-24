import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DehydratedState, Hydrate, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import BlockProvider from '@/providers/BlockProvider';
import Web3Provider from '@/providers/Web3Provider';
import queryClient from '@/data/queryClient';
import ErrorBoundary from '@/components/ErrorBoundary';
import Fallback from '@/components/Fallback';
import StateUpdater from '@/state/StateUpdater';
import AppHeader from '@/components/AppHeader';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary fallbackComponent={Fallback} onReset={reset}>
      <Suspense>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <StateUpdater />
              <Web3Provider>
                <BlockProvider>
                  <AppHeader className="fixed top-0 left-0 right-0" />
                  <Component {...pageProps} />
                </BlockProvider>
              </Web3Provider>
            </Hydrate>
          </QueryClientProvider>
        </RecoilRoot>
      </Suspense>
    </ErrorBoundary>
  );
}

export default MyApp;
