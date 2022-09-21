import Layout from '../../components/Layout'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const STATIC_PATHS = [{ params: { id: '1' } }, { params: { id: '2' } }]

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: STATIC_PATHS,
    fallback: false,
  }
}

// in dev mode, runs on every request
// in prod mode, runs at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      researchData: params,
    },
  }
}

export default function Research({ researchData }: { researchData: { id: number } }) {
  const router = useRouter()
  const className = router.query.id === '1' ? 'text-pink-300' : 'text-white'
  return (
    <Layout>
      <div className={className}>{researchData.id}</div>
    </Layout>
  )
}
