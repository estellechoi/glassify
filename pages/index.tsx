import type { NextPage } from 'next';
import Layout from '../components/Layout';

/** @summary next.js dynamic import example when the whole component must not be pre-rendered */
import dynamic from 'next/dynamic';

const PortfolioPieChart = dynamic(() => import('@/components/charts/PortfolioPieChart'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <Layout>
        <PortfolioPieChart />
      </Layout>
    </>
  );
};

export default Home;
