import Layout from '../components/Layout';
import { FallbackProps } from '../components/ErrorBoundary';

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);

  return (
    <Layout>
      <div className="text-white">ErrorFallback</div>
      <div>
        <button type="button" onClick={() => resetErrorBoundary()}>
          Retry
        </button>
      </div>
    </Layout>
  );
}
