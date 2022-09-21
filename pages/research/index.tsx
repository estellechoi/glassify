import { GetServerSideProps } from 'next'
import { Pool } from '@uniswap/v3-sdk'
import Layout from '../../components/Layout'

// runs at request time
export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch articles
  const articles: string[] = ['hello']

  return {
    props: {
      researchData: articles,
    },
  }
}

export default function ResearchList({ researchData }: { researchData: string[] }) {
  console.log('Pool', Pool)
  return (
    <Layout>
      <div>researchData.length</div>
    </Layout>
  )
}
