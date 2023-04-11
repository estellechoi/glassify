import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import * as api from '@/data/api';
import queryClient from '@/data/queryClient';
import { CoinId } from '@/constants/coin';
import { dehydrate } from '@tanstack/react-query';

/** @description this page is just to explore react query prefetching and hydration setup, cause I'm getting to know Next! */

export const getServerSideProps = async () => {
  await queryClient.prefetchQuery(['coinPrices'], async () => {
    const { data } = await api.coingecko.getCoinGeckoPrice({ ids: Object.values(CoinId), vs_currencies: ['usd'] });
    return data;
  });

  /** @description Hydrate the query client with the latest data */
  const dehydratedState = dehydrate(queryClient, {
    /** @description setting shouldDehydrateQuery to false can be useful when you want to ensure that certain query responses are not dehydrated on the server and are instead fetched fresh from the server when the query is rehydrated on the client side. */
    shouldDehydrateQuery: (query) => query.queryKey[0] === 'coinPrices',
  });

  return {
    props: {
      dehydratedState,
    },
  };
};

// NextPage<{ dehydratedState: DehydratedState }>
const Pools: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <Layout>
        <div className="flex items-stretch gap-x-10"></div>
      </Layout>
    </>
  );
};

export default Pools;
