import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Layout from '../components/Layout';
import Table from '../components/Table';
import { assetCountState, assetInfosAtom, watchListAtom } from '../state/states';
import { AssetInfoRaw } from '../types/asset';

/** @summary next.js dynamic import example when the whole component must not be pre-rendered */
// import dynamic from 'next/dynamic';
// const Table = dynamic(() => import('../components/Table'), { ssr: false }) as <T extends TableRow>({ ...args }: TableProps<T>) => JSX.Element;

const Home: NextPage = () => {
  /** @summary atoms & selector */
  const [assetInfos] = useRecoilState(assetInfosAtom);
  const assetCount = useRecoilValue(assetCountState);

  const [watchList, setWatchList] = useRecoilState(watchListAtom);

  const onAllTokensRowClick = useCallback((row: AssetInfoRaw) => {
    const included = watchList.map((item) => item.denom).includes(row.denom);
    if (!included) {
      setWatchList(watchList.concat([row]));
    }
  }, [watchList, setWatchList]);

  const onWatchListRowClick = useCallback((row: AssetInfoRaw) => {
    setWatchList(watchList.filter((item) => item.denom !== row.denom));
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
        <div className="mb-8">{assetCount} assets fetched.</div>

        <div className="grid grid-cols-2 gap-8">
          <Table<AssetInfoRaw>
            title="All Tokens"
            showTitle
            list={assetInfos}
            fields={[
            {
              label: 'Ticker',
              value: 'ticker',
            },
            {
              label: 'Denom',
              value: 'denom',
              abbrOver: 8,
              responsive: true,
            }
          ]}
            onRowClick={onAllTokensRowClick}
          />

          <Table<AssetInfoRaw>
            title="Watch List"
            showTitle
            list={watchList}
            fields={[
              {
                label: 'Ticker',
                value: 'ticker',
              },
              {
                label: 'Denom',
                value: 'denom',
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
