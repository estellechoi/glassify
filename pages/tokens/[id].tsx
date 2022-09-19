import Layout from '../../components/Layout'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      tokenData: params,
    },
  }
}

export default function Token({ tokenData }: { tokenData: { id: number } }) {
  const router = useRouter()
  const className = router.query.id === '1' ? 'text-pink-300' : 'text-white'
  return (
    <Layout>
      <div className={className}>{tokenData.id}</div>
    </Layout>
  )
}
