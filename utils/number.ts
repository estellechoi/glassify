import { FORMAT_LOCALE_FALLBACK, MAX_DECIMALS } from '@/constants/app';
import BigNumber from 'bignumber.js';

type FormatAmountOptions = {
  fiat?: boolean;
  semiequate?: boolean;
  compact?: boolean;
  fixDp?: boolean;
  roundMode?: BigNumber.RoundingMode;
  locale?: string;
};

export const formatNumber = (value?: BigNumber, decimals?: number, options?: FormatAmountOptions): string => {
  if (value === undefined) return '-';

  const dp = decimals ?? MAX_DECIMALS;
  const currencySymbol = options?.fiat ? '$' : '';
  const semiequateSymbol = options?.semiequate ? '≈' : '';

  const mindp = dp === 2 && options?.fiat ? 2 : options?.fixDp ? dp : undefined;

  const formatter = new Intl.NumberFormat(options?.locale ?? FORMAT_LOCALE_FALLBACK, {
    notation: options?.compact ? 'compact' : 'standard',
    maximumFractionDigits: dp,
    minimumFractionDigits: mindp,
    // @ts-ignore
    trailingZeroDisplay: mindp === undefined ? 'stripIfInteger' : 'auto',
  });

  if (value.isZero()) return `${semiequateSymbol}${currencySymbol}${formatter.format(0)}`;

  const min = new BigNumber(1).shiftedBy(-dp);
  if (value.lt(min)) return `${semiequateSymbol}<${currencySymbol}${formatter.format(min.toNumber())}`;

  const amount = value.dp(dp, options?.roundMode ?? BigNumber.ROUND_DOWN);
  return `${semiequateSymbol}${currencySymbol}${formatter.format(amount.toNumber()).toLocaleLowerCase()}`;
};

export const getDecimalSeperator = (locale: string): string | undefined => {
  return new Intl.NumberFormat(locale).formatToParts(1.1).find((part) => part.type === 'decimal')?.value;
};

export const getNumberParts = (formattedNumber: string, locale: string): [string, string | null] => {
  const decimalSeperator = getDecimalSeperator(locale);
  if (!decimalSeperator) return [formattedNumber, null];

  const [integer, fractions] = formattedNumber.split(decimalSeperator);
  return [integer, fractions !== '' ? fractions : null];
};
