/** @memo wip */
import { ErrorBoundary } from '@sentry/nextjs';

import { ReactNode } from 'react';
import { ErrorBoundaryProps } from './types';

const SentryErrorBoundary = ({ children, fallbackComponent, onReset }: { children: ReactNode } & ErrorBoundaryProps) => {
  // this is to follow typescript rule for react component to be in upper case
  const FallbackComponent = fallbackComponent;

  return (
    <ErrorBoundary
      beforeCapture={(scope) => {
        scope.setLevel('fatal');
      }}
      fallback={({ eventId }) => {
        return (
          <FallbackComponent
            error={eventId}
            resetErrorBoundary={() => {
              onReset?.();
            }}
          />
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default SentryErrorBoundary;
