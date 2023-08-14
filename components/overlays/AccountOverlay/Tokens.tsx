import { useCallback, useState } from 'react';
import CoinAmount, { type CoinAmountProps } from '@/components/CoinAmount';
import LabelText from '@/components/LabelText';
import LoadingRows from '@/components/LoadingRows';
import { formatNumber, formatUSD } from '@/utils/number';
import CurrencySwitch from '@/components/switches/CurrencySwitch';
import type { BalanceItem } from '@/types/asset';
import { COMPACT_DECIMALS } from '@/constants/app';

type TokensProps = {
  balances: readonly BalanceItem[];
  isBalanceLoading: boolean;
};

const Tokens = ({ balances, isBalanceLoading }: TokensProps) => {
  const [currencyIndex, setCurrencyIndex] = useState<0 | 1>(0);

  const getAmountProps = useCallback(
    (balance: BalanceItem): Pick<CoinAmountProps, 'formattedAmount'> => {
      const formattedAmount =
        currencyIndex === 0 ? formatUSD(balance.fiatValue.USD, { fixDp: true }) : formatNumber(balance.value, COMPACT_DECIMALS);
      return { formattedAmount };
    },
    [currencyIndex]
  );

  return (
    <section className="flex flex-col gap-y-3 px-1 py-3">
      <div className="flex items-center justify-between gap-x-2 mb-1">
        <LabelText size="sm" text="Tokens" />
        <CurrencySwitch selectedValue={currencyIndex} onSwitch={setCurrencyIndex} />
      </div>

      {isBalanceLoading ? (
        <LoadingRows rowsCnt={3} color="on_primary" fontClassName="Font_data_20px_num" />
      ) : (
        balances.map((balance) => (
          <CoinAmount key={balance.symbol} color="on_primary" size="md" symbol={balance.symbol} {...getAmountProps(balance)} />
        ))
      )}
    </section>
  );
};

export default Tokens;
