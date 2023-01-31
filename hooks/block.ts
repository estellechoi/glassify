import { useContext } from 'react';
import { BlockContext } from '../providers/BlockProvider';

function useBlockContext() {
  const blockNumber = useContext(BlockContext);
  if (blockNumber.value === 0) {
    throw new Error(`BlockNumber hook must be wrapped in a <BlockNumberProvider>`);
  }
  return blockNumber;
}

export const useBlockHeight = (): number => {
  return useBlockContext().value;
};
