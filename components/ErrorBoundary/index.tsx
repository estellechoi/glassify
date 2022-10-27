import React, { ErrorInfo, PropsWithChildren } from 'react';

export type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: unknown[]) => void;
};

type ErrorBoundaryProp = {
  fallbackComponent: React.ComponentType<FallbackProps>;
  onReset?: (...args: unknown[]) => void;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProp>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProp>) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI

    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log('ErrorBoundary', { error, errorInfo });
  }

  resetErrorBoundary = (...args: unknown[]) => {
    const { onReset } = this.props;

    onReset?.(...args);
    this.reset();
  };

  reset() {
    this.setState({ error: null });
  }

  render() {
    const { fallbackComponent: FallbackComponent, children } = this.props;
    const { error } = this.state;

    // Check if the error is thrown
    if (error !== null) {
      // You can render any custom fallback UI
      return <FallbackComponent error={error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    // Return children components in case of no error
    return children;
  }
}

export default ErrorBoundary;
