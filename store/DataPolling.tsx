import useCoinPricesUpdater from './useCoinPricesUpdater';
import AllChainBalanceUpdater from 'store/AllChainBalanceUpdater';

/** @todo to SSR */
const DataPolling = () => {
  useCoinPricesUpdater();

  return (
    <>
      <AllChainBalanceUpdater />
    </>
  );
};

export default DataPolling;
