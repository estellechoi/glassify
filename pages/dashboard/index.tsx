import Link from 'next/link';
import Layout from '../../components/Layout';

export default function DashBoard() {
  return (
    <Layout>
      <div className="text-white">DashBoard</div>
      <div className="text-white">
        <Link
          href={{
            pathname: '/tokens/[id]',
            query: { id: '1' },
          }}
        >
          Token 1
        </Link>
      </div>
    </Layout>
  );
}
