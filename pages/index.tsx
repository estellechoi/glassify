import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import { TITLES } from '@/constants/app';
import AnimatedHeadline, { type AnimatedHeadlineProps } from '@/components/AnimatedHeadline';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  const headlineProps: AnimatedHeadlineProps = {
    tagName: 'h2',
    texts: TITLES.HOME,
  };

  return (
    <>
      <AsciiGlobe />

      <Layout>
        <section className="relative h-screen Padding_page flex flex-col justify-end items-center md:items-start">
          <AnimatedHeadline {...headlineProps} className="hidden md:flex" />
          <AnimatedHeadline {...headlineProps} align="center" className="md:hidden" />
        </section>
      </Layout>
    </>
  );
};

export default Home;
