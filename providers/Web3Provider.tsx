import { ReactNode, useMemo } from 'react';
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import useOrderedConnectors, { SELECTABLE_WALLETS } from '../connection/hooks/useOrderedConnectors';

export default function Web3Provider({ children }: { children: ReactNode }) {
  const key = SELECTABLE_WALLETS.join('-');
  const connectors: [Connector, Web3ReactHooks][] = useOrderedConnectors();

  return (
    <Web3ReactProvider key={key} connectors={connectors}>
      {children}
    </Web3ReactProvider>
  );
}
