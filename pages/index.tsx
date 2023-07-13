import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { TITLES } from '@/constants/app';
import AnimatedHeadline from '@/components/AnimatedHeadline';

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
        <AnimatedHeadline tagName="h2" texts={TITLES.HOME} className="absolute bottom-28" />
      </Layout>
    </>
  );
};

export default Home;
