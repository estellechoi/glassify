import type { CoinSize } from '@/components/Coin';
import { type TextColor, TEXT_COLOR_CLASS_DICT } from '@/components/styles';

export type CoinLabelSize = 'sm' | 'md' | 'lg';

export const SIZE_DICT: Record<CoinLabelSize, { coinSize: CoinSize; fontClassName: string }> = {
  sm: { coinSize: 'sm', fontClassName: 'Font_body_xs' },
  md: { coinSize: 'md', fontClassName: 'Font_body_sm' },
  lg: { coinSize: 'lg', fontClassName: 'Font_body_md' },
};

export type CoinLabelColor = TextColor;
export const COLOR_CLASS_DICT: Record<CoinLabelColor, string> = TEXT_COLOR_CLASS_DICT;
