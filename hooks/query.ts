import { useWeb3React } from '@web3-react/core';
import { useBlockHeight } from './block';

function useCallContext() {
  const { chainId } = useWeb3React();
  const latestBlock = useBlockHeight();
  return { chainId, latestBlock };
}
