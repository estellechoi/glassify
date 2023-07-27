import Coin, { type CoinSize } from '@/components/Coin';
import NumberText, { type NumberTextSize } from '@/components/NumberText';

const SIZE_MAPPING_DICT: Record<NumberTextSize, CoinSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'lg',
};

export type CoinAmountProps = {
  size: NumberTextSize;
  coinSize?: CoinSize;
  symbol?: string;
  formattedAmount?: string;
  amountUnit?: string;
};

const CoinAmount = ({ formattedAmount, size, coinSize: injectedCoinSize, symbol, amountUnit }: CoinAmountProps) => {
  const coinSize = injectedCoinSize ?? SIZE_MAPPING_DICT[size];

  return (
    <span className="w-full flex items-center justify-between gap-x-2.5">
      <span className="inline-flex items-center gap-x-2.5">
        <Coin size={coinSize} symbol={symbol} />
        <span className="text-white Font_body_sm">{symbol}</span>
      </span>

      <NumberText size={size} formattedNumber={formattedAmount} unit={amountUnit} />
    </span>
  );
};

export default CoinAmount;
