import { FORMAT_LOCALE_FALLBACK } from '@/constants/app';
import { getFormattedNumberParts } from '@/utils/number';
import CountUpNumber from './CountUpNumber';
import { useCallback, useMemo, useState } from 'react';

export type NumberTextType = 'normal' | 'small_fractions';
export type NumberTextSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASS_DICT: Record<NumberTextSize, { integer: string; fractions: string; unit: string }> = {
  sm: { integer: 'Font_data_12px_num', fractions: 'Font_data_12px_num', unit: 'Font_data_12px_unit' },
  md: { integer: 'Font_data_16px_num', fractions: 'Font_data_12px_num', unit: 'Font_data_12px_unit' },
  lg: { integer: 'Font_data_20px_num', fractions: 'Font_data_14px_num', unit: 'Font_data_14px_unit' },
  xl: { integer: 'Font_data_32px_num', fractions: 'Font_data_20px_num', unit: 'Font_data_20px_unit' },
};

type NumberTextProps = {
  type?: NumberTextType;
  formattedNumber?: string;
  unit?: string;
  size?: NumberTextSize;
  locale?: string;
  animate?: boolean;
};

const NumberText = ({
  type = 'normal',
  formattedNumber,
  unit,
  size = 'md',
  locale = FORMAT_LOCALE_FALLBACK,
  animate = false,
}: NumberTextProps) => {
  // styles
  const sizeClassNames = SIZE_CLASS_DICT[size];
  const fractionsSizeClassName = useMemo(
    () => (type === 'small_fractions' ? sizeClassNames.fractions : sizeClassNames.integer),
    [type, sizeClassNames]
  );

  // number parts
  const [integer, fractions] = formattedNumber ? getFormattedNumberParts(formattedNumber, locale) : [null, null];

  // animation effect
  const [isFractionsAnimated, setIsFractionsAnimated] = useState<boolean>(false);
  const onFractionsAnimationEnd = useCallback(() => setIsFractionsAnimated(true), []);

  return (
    <span className="text-white flex items-baseline gap-x-1">
      {integer !== null ? (
        <>
          <span className="flex items-baseline">
            <span className={sizeClassNames.integer}>
              {animate ? <CountUpNumber formattedNumber={integer} locale={locale} isStarted={isFractionsAnimated} /> : integer}
            </span>

            {fractions && (
              <span className={fractionsSizeClassName}>
                .
                {animate ? (
                  <CountUpNumber formattedNumber={fractions} locale={locale} duration={0.4} onEnd={onFractionsAnimationEnd} />
                ) : (
                  fractions
                )}
              </span>
            )}
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
