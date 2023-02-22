import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DehydratedState, Hydrate, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import queryClient from '@/data/queryClient';
import ErrorBoundary from '@/components/ErrorBoundary';
import Fallback from '@/components/Fallback';
import StateUpdater from '@/state/StateUpdater';
import AppHeader from '@/components/AppHeader';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { SEO } from 'next-seo.config';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Head>
        <title>Paper</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f5f5f5" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <NextSeo {...SEO} />

      <ErrorBoundary fallbackComponent={Fallback} onReset={reset}>
        <Suspense>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <StateUpdater />

                <div className="pt-[var(--height-navbar)]">
                  <AppHeader className="fixed top-0 left-0 right-0 z-10" />
                  <Component {...pageProps} />
                </div>
              </Hydrate>
            </QueryClientProvider>
          </RecoilRoot>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
