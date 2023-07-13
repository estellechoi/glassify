import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useRef } from 'react';
import queryClient from '@/data/queryClient';
import Fallback from '@/components/Fallback';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { SEO } from 'next-seo.config';
import SentryErrorBoundary from '@/components/ErrorBoundary/SentryErrorBoundary';
import useConnectors from '@/connection/useWallets';
import AppHeader from '@/components/AppHeader';
import { ModalProvider } from '@/hooks/useModal/ModalProvider';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const { reset } = useQueryErrorResetBoundary();

  /**
   *
   * @description ensure that it persists across multiple renders
   */
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = queryClient;
    queryClientRef.current.setDefaultOptions({
      queries: {
        initialData: pageProps.dehydratedState,
      },
    });
  }

  useConnectors();

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

      <SentryErrorBoundary fallbackComponent={Fallback} onReset={reset}>
        <Suspense>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <ModalProvider>
                <div className="pt-[var(--height-navbar)]">
                  <AppHeader className="fixed top-0 left-0 right-0 z-10" />
                  <Component {...pageProps} />
                </div>
              </ModalProvider>
            </Hydrate>
          </QueryClientProvider>
        </Suspense>
      </SentryErrorBoundary>
    </>
  );
}

export default MyApp;
