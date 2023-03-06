import useCoinDetailUpdater from './useCoinDetailUpdater';
import AllChainBalanceUpdater from '@/state/AllChainBalanceUpdater';

/** @todo to SSR */
export default function StateUpdater() {
  /** coin prices dict */
  useCoinDetailUpdater();

  return (
    <>
      <AllChainBalanceUpdater />
    </>
  );
}
