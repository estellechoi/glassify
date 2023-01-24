import { useCoinByIdQuery } from '@/data/useWeb2Query';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';

interface Params extends ParsedUrlQuery {
  id: string;
}

/** react-query ssr docs: https://tanstack.com/query/v4/docs/guides/ssr */
// export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
//   const { id } = params as Params;

//   const fetcher = async () => {
//     const res = await fetchCoinById({ id });
//     return res?.data;
//   };

//   await queryClient.prefetchQuery<CoinDetail>(['coins', id], fetcher);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       id,
//     },
//   };
// };

const Token: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as Params;

  const { data: coinDetail } = useCoinByIdQuery({ id });

  console.log('coinDetail', coinDetail);

  return (
    <Layout>
      <div className="flex items-center gap-x-2">
        {coinDetail && (
          <div className="flex justify-center items-center object-contain rounded-full w-6 h-6">
            <Image src={coinDetail.logo} width={24} height={24} />
          </div>
        )}
        <div className="">{coinDetail?.name}</div>
      </div>
    </Layout>
  );
};

export default Token;
