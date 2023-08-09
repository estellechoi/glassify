import NumberText, { type NumberTextSize } from '@/components/NumberText';
import CoinLabel from '@/components/CoinLabel';
import { CoinLabelSize } from '@/components/CoinLabel/styles';
import { TextColor } from '@/components/styles';

export type CoinAmountColor = TextColor;

const COIN_LABEL_SIZE_MAPPING_DICT: Record<NumberTextSize, CoinLabelSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'lg',
};

export type CoinAmountProps = {
  color?: CoinAmountColor;
  size: NumberTextSize;
  symbol?: string;
  formattedAmount?: string;
  amountUnit?: string;
};

const CoinAmount = ({ formattedAmount, color = 'primary', size, symbol, amountUnit }: CoinAmountProps) => {
  const coinLabelSize = COIN_LABEL_SIZE_MAPPING_DICT[size];

  return (
    <span className="w-full flex items-center justify-between gap-x-2.5">
      <CoinLabel color={color} size={coinLabelSize} symbol={symbol} />
      <NumberText color={color} size={size} formattedNumber={formattedAmount} unit={amountUnit} />
    </span>
  );
};

export default CoinAmount;
