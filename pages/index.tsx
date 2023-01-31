import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

/** @summary next.js dynamic import example when the whole component must not be pre-rendered */
// import dynamic from 'next/dynamic';
// const Table = dynamic(() => import('../components/Table'), { ssr: false }) as <T extends TableRow>({ ...args }: TableProps<T>) => JSX.Element;

const Home: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      <Head>
        <title>Glassify</title>
        <meta name="description" content="Glassify is defi aggregator living on Ethereum" />
        <link rel="icon" href="/images/favicon_glow.svg" />
      </Head>

      <Layout> </Layout>
    </>
  );
};

export default Home;
