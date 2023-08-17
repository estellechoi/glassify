import Card from '@/components/Card';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';
import useUserAgent from '@/hooks/useUserAgent';
import { ConnectedWallet } from '@/types/wallet';

type BalanceTokensCardProps = {
  wallet: ConnectedWallet;
  isOpen?: boolean;
  className?: string;
  onBalanceTokensTableLoaded?: () => void;
};

const BalanceTokensCard = ({ wallet, isOpen, className = '', onBalanceTokensTableLoaded }: BalanceTokensCardProps) => {
  const { isMobile } = useUserAgent();

  const Table = <BalanceTokensTable tooltipContext="overlay" wallet={wallet} onLoaded={onBalanceTokensTableLoaded} />;

  return isMobile ? (
    <article className={className}>{Table}</article>
  ) : (
    <Card color="glass" className={className}>
      {/* <AnimatedHeadline tagName="h3" texts={['Market change']} className="hiddn md:flex pl-2 mb-3" /> */}
      {Table}
    </Card>
  );
};

export default BalanceTokensCard;
