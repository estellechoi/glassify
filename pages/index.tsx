import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import AppHeadline from '@/components/AppHeadline';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <AsciiGlobe />

      <div className="fixed left-8 bottom-20 md:left-24 md:bottom-[8.125rem]">
        <AppHeadline />
      </div>

      <Layout>
        <section></section>
      </Layout>
    </>
  );
};

export default Home;
