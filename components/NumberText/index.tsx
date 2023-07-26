import { FORMAT_LOCALE_FALLBACK } from '@/constants/app';
import { getNumberParts } from '@/utils/number';

export type NumberTextType = 'normal' | 'small_fractions';
export type NumberTextSize = 'md' | 'lg';

const SIZE_CLASS_DICT: Record<NumberTextSize, { integer: string; fractions: string; unit: string }> = {
  md: { integer: 'Font_data_16px_num', fractions: 'Font_data_12px_num', unit: 'Font_data_12px_unit' },
  lg: { integer: 'Font_data_20px_num', fractions: 'Font_data_12px_num', unit: 'Font_data_12px_unit' },
};

type NumberTextProps = {
  type?: NumberTextType;
  formattedNumber?: string;
  unit?: string;
  size?: NumberTextSize;
  locale?: string;
};

const NumberText = ({
  type = 'normal',
  formattedNumber,
  unit,
  size = 'md',
  locale = FORMAT_LOCALE_FALLBACK,
}: NumberTextProps) => {
  const [integer, fractions] = formattedNumber ? getNumberParts(formattedNumber, locale) : [null, null];

  const sizeClassNames = SIZE_CLASS_DICT[size];
  const fractionsSizeClassName = type === 'small_fractions' ? sizeClassNames.fractions : sizeClassNames.integer;

  return (
    <span className="text-white flex items-baseline gap-x-1">
      {integer !== null ? (
        <>
          <span className="flex items-baseline">
            <span className={sizeClassNames.integer}>{integer}</span>
            {fractions && <span className={fractionsSizeClassName}>.{fractions}</span>}
          </span>
          <span className={sizeClassNames.unit}>{unit}</span>
        </>
      ) : (
        '-'
      )}
    </span>
  );
};

export default NumberText;
