import CoinsUpdater from './CoinsUpdater';
import AllChainBalanceUpdater from 'store/AllChainBalanceUpdater';

/** @todo to SSR */
const DataPolling = () => {
  return (
    <>
      <CoinsUpdater />
      <AllChainBalanceUpdater />
    </>
  );
};

export default DataPolling;
