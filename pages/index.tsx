import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Layout from '../components/Layout';
import Table from '../components/Table';
import { coinsAtom, watchListAtom } from '../state/states';
import { Coin } from '../types/coin';

/** @summary next.js dynamic import example when the whole component must not be pre-rendered */
// import dynamic from 'next/dynamic';
// const Table = dynamic(() => import('../components/Table'), { ssr: false }) as <T extends TableRow>({ ...args }: TableProps<T>) => JSX.Element;

const Home: NextPage = () => {
  const [coins] = useRecoilState(coinsAtom);
  const [watchList, setWatchList] = useRecoilState(watchListAtom);

  const onAllTokensRowClick = useCallback((row: Coin) => {
    const included = watchList.map((item) => item.id).includes(row.id);
    if (!included) {
      setWatchList(watchList.concat([row]));
    }
  }, [watchList, setWatchList]);

  const onWatchListRowClick = useCallback((row: Coin) => {
    setWatchList(watchList.filter((item) => item.id !== row.id));
}, [setWatchList, watchList]);

  return (
    <>
      {/* page-specific head */}
      <Head>
        <title>Glassify</title>
        <meta name="description" content="Glassify is defi aggregator living on Ethereum" />
        <link rel="icon" href="/images/favicon_glow.svg" />
      </Head>

      <Layout>
        <div className="grid grid-cols-2 gap-8">
          <Table<Coin>
            title="All Tokens"
            showTitle
            list={coins.slice(0, 20)}
            fields={[
            {
              label: 'Rank',
              value: 'rank',
            },
            {
              label: 'Token',
              value: 'symbol',
              abbrOver: 8,
              responsive: true,
            }
          ]}
            onRowClick={onAllTokensRowClick}
          />

          <Table<Coin>
            title="Watch List"
            showTitle
            list={watchList}
            fields={[
              {
                label: 'Rank',
                value: 'rank',
              },
              {
                label: 'Token',
                value: 'symbol',
                abbrOver: 8,
                responsive: true,
              }
            ]}
            onRowClick={onWatchListRowClick}
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;
