import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <AsciiGlobe />

      <Layout>
        <section></section>
      </Layout>
    </>
  );
};

export default Home;
