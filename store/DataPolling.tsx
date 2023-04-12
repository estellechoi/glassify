import CoinsUpdater from './CoinsUpdater';
import AllChainBalanceUpdater from 'store/AllChainBalanceUpdater';

const DataPolling = () => {
  return (
    <>
      <CoinsUpdater />
      <AllChainBalanceUpdater />
    </>
  );
};

export default DataPolling;
