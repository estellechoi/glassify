import type { NextPage } from 'next';
import Layout from '@/components/Layout';

/** @summary next.js dynamic import example when the whole component must not be pre-rendered */
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import { formatNumber } from '@/utils/number';
import useBalance from '@/hooks/useBalance';

const PortfolioPieChart = dynamic(() => import('@/components/charts/PortfolioPieChart'), {
  ssr: false,
});

const Home: NextPage = () => {
  const { holdings, totalBalanceUSD } = useBalance();

  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <Layout>
        <div className="flex items-stretch gap-x-10">
          <Card className="basis-full">
            <div className="space-y-[3.52rem]">
              <div className="space-y-2">
                <div className="Font_label_12px">Total Balance</div>
                <div className="Font_data_32px_num">{formatNumber(totalBalanceUSD, { fiat: true })}</div>
              </div>

              <PortfolioPieChart holdings={holdings} totalBalanceUSD={totalBalanceUSD} />
            </div>
          </Card>

          <Card className="basis-full" weak={true}>
            Lorem..
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
