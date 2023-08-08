import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import AppHeadline from '@/components/AppHeadline';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [userWallet] = useAtom(userWalletAtom);

  return (
    <>
      <AsciiGlobe />

      <div className="fixed left-8 bottom-20 md:left-24 md:bottom-[8.125rem]">
        <AppHeadline />
      </div>

      <Layout>
        <section className="Padding_page">{userWallet && <BalanceTokensTable wallet={userWallet} />}</section>
      </Layout>
    </>
  );
};

export default Home;
