import Coin from '@/components/Coin';
import { COLOR_CLASS_DICT, CoinLabelColor, CoinLabelSize, SIZE_DICT } from './styles';

type CoinLabelProps = {
  symbol?: string;
  size?: CoinLabelSize;
  color?: CoinLabelColor;
};

const CoinLabel = ({ symbol, size = 'md', color = 'primary' }: CoinLabelProps) => {
  const { coinSize, fontClassName } = SIZE_DICT[size];
  const colorClassName = COLOR_CLASS_DICT[color];

  return (
    <span className="inline-flex items-center gap-x-2">
      <Coin size={coinSize} symbol={symbol} />
      <span className={`${colorClassName} ${fontClassName}`}>{symbol}</span>
    </span>
  );
};

export default CoinLabel;
