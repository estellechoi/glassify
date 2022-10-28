import { useCoinByIdQuery } from '@/data/useWeb2Query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import queryClient from '@/data/queryClient';
import { fetchCoinById } from '@/data/fetchers';
import { dehydrate } from '@tanstack/react-query';
import Layout from '../../components/Layout';

interface Params extends ParsedUrlQuery {
  id: string
}

/** react-query ssr docs: https://tanstack.com/query/v4/docs/guides/ssr */
export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  /** @todo research - is it okay to assert params? */
  const { id } = params as Params;

  /**
   * @todo error - react-query dehydrate serializing /w axios response
   * @link https://stackoverflow.com/questions/71630615/next-js-error-serializing-dehydratedstate-queries0-state-data-config-adapter
   * @link https://stackoverflow.com/questions/71763805/not-work-dehydrate-methodreact-query-in-nextjs
   * */
  await queryClient.prefetchQuery(['coins', params], () => fetchCoinById({ coin_id: id }));

  return ({
    props: {
      dehydratedState: dehydrate(queryClient),
      id
    },
  });
};

export default function Token({ id }: Params) {
  // const router = useRouter();
  // const { id } = router.query as Params;
  const className = id === 'btc-bitcoin' ? 'text-pink-300' : 'text-white';

  const { isLoading, data: coinData } = useCoinByIdQuery({ coin_id: id });

  console.log('coinData', coinData);

  return (
    <Layout>
      <div className={className}>{id}</div>
    </Layout>
  );
}
