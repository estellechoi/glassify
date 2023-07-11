import { useCallback, useEffect, useState } from 'react';
import type { Connector } from '@/connectors/types';

const useConnector = <T extends Connector>(initialize: () => Promise<T | undefined>) => {
  const [connector, setConnector] = useState<T>();

  const initializeConnector = useCallback(async () => {
    const initializedConnector = await initialize();
    setConnector(initializedConnector);
  }, [initialize]);

  useEffect(() => {
    initializeConnector();
  }, []);

  return connector;
};

export default useConnector;
