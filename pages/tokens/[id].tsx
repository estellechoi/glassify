import Layout from '../../components/Layout'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      tokenData: params,
    },
  }
}

export default function Token() {
  const router = useRouter()
  const { id } = router.query
  const className = id === '1' ? 'text-pink-300' : 'text-white'

  return (
    <Layout>
      <div className={className}>{id}</div>
    </Layout>
  )
}
