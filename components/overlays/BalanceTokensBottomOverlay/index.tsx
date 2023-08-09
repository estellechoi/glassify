import BottomOverlay from '@/components/BottomOverlay';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';
import { ConnectedWallet } from '@/types/wallet';

type BalanceTokensBottomOverlayProps = {
  wallet: ConnectedWallet;
  isOpen?: boolean;
  className?: string;
  onBalanceTokensTableLoaded?: () => void;
};

const BalanceTokensBottomOverlay = ({
  wallet,
  isOpen,
  className = '',
  onBalanceTokensTableLoaded,
}: BalanceTokensBottomOverlayProps) => {
  return (
    <BottomOverlay role="article" isOpen={isOpen} className={className}>
      {/* <AnimatedHeadline tagName="h3" texts={['Market change']} className="hiddn md:flex pl-2 mb-3" /> */}
      <BalanceTokensTable wallet={wallet} onLoaded={onBalanceTokensTableLoaded} />
    </BottomOverlay>
  );
};

export default BalanceTokensBottomOverlay;
