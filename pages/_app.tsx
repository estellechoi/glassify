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
import AppHeader from '@/components/AppHeader';
import { ModalProvider } from '@/hooks/useModal/ModalProvider';
import { userWalletAtom } from '@/store/states';
import { useAtom } from 'jotai';
import useSetupTokens from '@/hooks/useSetupTokens';
import dynamic from 'next/dynamic';

const MetaDataUpdater = () => {
  useSetupTokens();
  return null;
};

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

  const [userWallet] = useAtom(userWalletAtom);

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
        <link rel="icon" href="/app_favicon.png" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Paper" />
        <meta name="apple-mobile-web-app-title" content="Paper" />
        <link rel="apple-touch-icon" href="/app_icon_192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/app_icon_192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/app_icon_192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/app_icon_192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* <link rel="mask-icon" href="" color="#F5F5F5" /> */}

        <meta name="description" content="Finance, effortless, all hours" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#F5F5F5" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#F5F5F5" />
      </Head>

      <NextSeo {...SEO} />

      <SentryErrorBoundary fallbackComponent={Fallback} onReset={reset}>
        <Suspense>
          <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <MetaDataUpdater />
              <ModalProvider>
                <AppHeader className="fixed top-0 left-0 right-0 z-10" />
                <Component {...pageProps} />
              </ModalProvider>
            </Hydrate>
          </QueryClientProvider>
        </Suspense>
      </SentryErrorBoundary>
    </>
  );
}

export default MyApp;
