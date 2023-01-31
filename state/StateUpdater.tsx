import useCoinDetailUpdater from './useCoinDetailUpdater';
import useBalanceUpdater from '@/state/useBalanceUpdater';

/** @todo to SSR */
export default function StateUpdater() {
  /** coin prices dict */
  useCoinDetailUpdater();

  /** balance */
  useBalanceUpdater();

  return <></>;
}
