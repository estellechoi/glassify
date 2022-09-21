import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import usePools from '../hooks/usePools'

const Home: NextPage = () => {
  const pools = usePools([])

  return (
    <Layout>
      <Head>
        <title>Glassify</title>
        {/* <meta name="description" content="Glassify is defi aggregator living on Ethereum" /> */}
        <link rel="icon" href="/images/favicon_glow.svg" />
      </Head>
    </Layout>
  )
}

export default Home
