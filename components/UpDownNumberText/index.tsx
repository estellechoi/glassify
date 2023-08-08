import { formatNumber } from '@/utils/number';
import BigNumber from 'bignumber.js';
import Icon, { IconType } from '@/components/Icon';
import { useMemo } from 'react';

type UpDownNumberTextProps = {
  number: number | BigNumber | undefined | null;
  unit?: string;
};

const UpDownNumberText = ({ number, unit }: UpDownNumberTextProps) => {
  const fallbackedNumber = useMemo<BigNumber>(() => new BigNumber(number ?? 0), [number]);

  const colorClassName = useMemo<string>(
    () => (fallbackedNumber.gt(0) ? 'text-semantic_bull' : fallbackedNumber.lt(0) ? 'text-semantic_bear' : ''),
    [fallbackedNumber]
  );
  const iconType = useMemo<IconType | undefined>(
    () => (fallbackedNumber.gt(0) ? 'increase' : fallbackedNumber.lt(0) ? 'decrease' : undefined),
    [fallbackedNumber]
  );

  return (
    <span className={`inline-flex items-center Font_data_16px_num ${colorClassName}`}>
      {iconType && <Icon type={iconType} size="lg" />}
      {formatNumber(number, 1, { fixDp: true })}
      {!!number ? unit : ''}
    </span>
  );
};

export default UpDownNumberText;
