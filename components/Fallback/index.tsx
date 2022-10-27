import { FallbackProps } from '../ErrorBoundary';
import Layout from '../Layout';

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
