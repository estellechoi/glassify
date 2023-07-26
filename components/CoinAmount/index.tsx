import Coin, { type CoinSize } from '@/components/Coin';
import NumberText, { type NumberTextSize } from '@/components/NumberText';

const SIZE_MAPPING_DICT: Record<NumberTextSize, CoinSize> = {
  md: 'md',
  lg: 'lg',
};

type CoinAmountProps = {
  size: NumberTextSize;
  formattedAmount?: string;
  symbol?: string;
  coinSize?: CoinSize;
};

const CoinAmount = ({ formattedAmount, size, coinSize: injectedCoinSize, symbol }: CoinAmountProps) => {
  const coinSize = injectedCoinSize ?? SIZE_MAPPING_DICT[size];

  return (
    <span className="flex items-center gap-x-2.5">
      <Coin size={coinSize} symbol={symbol} />
      <NumberText type="small_fractions" size={size} formattedNumber={formattedAmount} unit={symbol} />
    </span>
  );
};

export default CoinAmount;
