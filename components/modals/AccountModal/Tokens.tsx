import CoinAmount from '@/components/CoinAmount';
import LabelText from '@/components/LabelText';
import LoadingRows from '@/components/LoadingRows';
import { useBalancesQuery, useEthBalanceQuery } from '@/data/hooks';
import type { ConnectedWallet } from '@/types/wallet';
import { formatNumber } from '@/utils/number';

const Tokens = ({ wallet }: { wallet: ConnectedWallet }) => {
  const { data: ethBalance } = useEthBalanceQuery({ wallet });
  const { data: balances, isLoading: isBalancesLoading } = useBalancesQuery({ wallet });

  return (
    <section className="flex flex-col gap-y-3 px-1 py-3">
      <LabelText size="sm" text="Tokens" className="mb-1" />

      <CoinAmount size="lg" formattedAmount={formatNumber(ethBalance?.value, ethBalance?.decimals)} symbol={ethBalance?.symbol} />

      {isBalancesLoading ? (
        <LoadingRows rowsCnt={3} fontClassName="Font_data_20px_num" />
      ) : (
        balances?.map((balance) => (
          <CoinAmount
            key={balance.symbol}
            size="lg"
            formattedAmount={formatNumber(balance?.value, balance?.decimals)}
            symbol={balance.symbol}
          />
        ))
      )}
    </section>
  );
};

export default Tokens;
