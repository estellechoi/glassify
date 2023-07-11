import type MetaMask from '@/connectors/MetaMask';
import useConnector from './useConnector';
import { initializeMetamask } from './metamask';

const useConnectors = () => {
  const metamask = useConnector<MetaMask>(initializeMetamask);

  return {
    metamask,
  };
};

export default useConnectors;
