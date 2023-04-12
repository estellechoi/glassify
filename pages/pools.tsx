import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import * as api from '@/data/api';
import queryClient from '@/data/queryClient';
import { dehydrate } from '@tanstack/react-query';
import { CoinId } from '@/types/coin';

/** @description this page is just to explore react query prefetching and hydration setup, cause I'm getting to know Next! */

export const getServerSideProps = async () => {
  const tmpId = Object.values(CoinId)[0];
  await queryClient.prefetchQuery(['coin', tmpId], async () => {
    const { data } = await api.coingecko.getCoinById({ id: tmpId });
    return data;
  });

  /** @description Hydrate the query client with the latest data */
  const dehydratedState = dehydrate(queryClient, {
    /** @description setting shouldDehydrateQuery to false can be useful when you want to ensure that certain query responses are not dehydrated on the server and are instead fetched fresh from the server when the query is rehydrated on the client side. */
    shouldDehydrateQuery: (query) => query.queryKey[0] === 'coin',
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
