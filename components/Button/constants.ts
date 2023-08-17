import { WaitingSymbolColor } from '../WaitingSymbol/types';
import type { ButtonColor, ButtonSize, ButtonStatus, ButtonType } from './types';

export const BUTTON_COLOR_CLASS_DICT: Record<ButtonType, Record<ButtonColor | 'disabled', string>> = {
  fill: {
    primary: 'bg-primary text-white border border-primary',
    primary_inverted: 'bg-white text-primary border border-white',
    secondary: 'bg-secondary text-white',
    disabled: 'bg-disabled text-white',
  },
  outline: {
    primary: 'bg-transparent text-primary border border-primary',
    primary_inverted: 'bg-transparent text-white border border-white',
    secondary: 'bg-transparent text-secondary border border-secondary',
    disabled: 'bg-transparent text-disabled border border-disabled',
  },
  text: {
    primary: 'bg-transparent text-primary',
    primary_inverted: 'bg-transparent text-white',
    secondary: 'bg-transparent text-secondary',
    disabled: 'bg-transparent text-disabled',
  },
};

export const BUTTON_WAITING_SYMBOL_COLOR_DICT: Record<ButtonType, Record<ButtonColor, WaitingSymbolColor>> = {
  fill: {
    primary: 'white',
    primary_inverted: 'primary',
    secondary: 'white',
  },
  outline: {
    primary: 'primary',
    primary_inverted: 'white',
    secondary: 'secondary',
  },
  text: {
    primary: 'primary',
    primary_inverted: 'white',
    secondary: 'secondary',
  },
};

export const TEXT_SIZE_CLASS_DICT: Record<ButtonSize, string> = {
  xs: 'Font_button_xs px-3 py-0.5',
  sm: 'Font_button_sm px-4 py-1',
  md: 'Font_button_md px-6 py-3',
  lg: 'Font_button_lg px-7 py-4',
  xl: 'Font_button_xl px-8 py-5',
};

export const BUTTON_HEIGHT_CLASS_DICT: Record<ButtonSize, string> = {
  xs: 'h-[1.875rem]',
  sm: 'h-[2.375rem]',
  md: 'h-[3.375rem]',
  lg: 'h-[4.375rem]',
  xl: 'h-[5.625rem]',
};

export const BUTTON_PADDING_CLASS_DICT: Record<ButtonSize, string> = {
  xs: 'p-1',
  sm: 'p-1',
  md: 'p-1.5',
  lg: 'p-1.5',
  xl: 'p-1.5',
};

export const BUTTON_CURSOR_CLASS_DICT: Record<ButtonStatus, string> = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
  processing: 'cursor-wait',
};
