import Layout from '@/components/Layout';
import Card from '@/components/Card';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      {/* page-specific head */}
      {/* <Head></Head> */}

      <Layout>
        <div className="flex items-stretch gap-x-10">
          <Card className="grow shrink basis-full">
            <div className="space-y-[3.52rem]">
              <div className="space-y-2">
                <div className="Font_label_12px">Total Balance</div>
                {/* <div className="Font_data_32px_num">{formatNumber(totalBalanceUSD, { fiat: true })}</div> */}
              </div>

              {/* <PortfolioPieChart holdings={holdings} totalBalanceUSD={totalBalanceUSD} /> */}
            </div>
          </Card>

          <Card className="grow shrink basis-full" weak={true}>
            Lorem..
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
