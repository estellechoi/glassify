import Layout from '@/components/Layout';
import type { NextPage } from 'next';
import Globe from 'canvas/Globe';

const Home: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <Layout>
        <Globe />
        <section></section>
      </Layout>
    </>
  );
};

export default Home;
