import { type ComponentPropsWithoutRef, useMemo } from 'react';
import ButtonLeadingIcon from './ButtonLeadingIcon';
import {
  BUTTON_COLOR_CLASS_DICT,
  BUTTON_CURSOR_CLASS_DICT,
  BUTTON_HEIGHT_CLASS_DICT,
  BUTTON_PADDING_CLASS_DICT,
  BUTTON_WAITING_SYMBOL_COLOR_DICT,
  TEXT_SIZE_CLASS_DICT,
} from './constants';
import type { ButtonColor, ButtonSize, ButtonStatus, ButtonType } from './types';
import type { IconType } from '@/components/Icon';
import WaitingSymbol from '../WaitingSymbol';

export type ButtonProps = Readonly<
  {
    iconType: IconType;
    label: string;
    onClick?: () => void;
    labelHidden?: boolean;
    type?: ButtonType;
    color?: ButtonColor;
    size?: ButtonSize;
    status?: ButtonStatus;
    className?: string;
  } & Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'disabled' | 'onClick' | 'className'>
>;

const Button = ({
  iconType,
  label,
  onClick,
  labelHidden = false,
  type = 'fill',
  color = 'primary',
  size = 'md',
  status = 'enabled',
  className = '',
  ...intrinsicProps
}: ButtonProps) => {
  const disabled = useMemo<boolean>(() => status === 'disabled' || status === 'processing', [status]);
  const processing = useMemo<boolean>(() => status === 'processing', [status]);

  const cursorClassName = BUTTON_CURSOR_CLASS_DICT[status];
  const colorClassName = labelHidden ? '' : BUTTON_COLOR_CLASS_DICT[type][status === 'disabled' ? 'disabled' : color];
  const fontClassName = TEXT_SIZE_CLASS_DICT[size];
  const heightClassName = BUTTON_HEIGHT_CLASS_DICT[size];
  const paddingClassName = BUTTON_PADDING_CLASS_DICT[size];
  const textVisibilityClassName = labelHidden ? 'sr-only' : '';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`Component group/button w-fit inline-flex justify-between items-center rounded-button transition-transform Transition_500 enabled:hover:scale-110 ${heightClassName} ${paddingClassName} ${cursorClassName} ${colorClassName} ${className}`}
      {...intrinsicProps}
    >
      <ButtonLeadingIcon type={type} color={color} size={size} iconType={iconType} disabled={disabled} />
      <span className={`grow truncate ${fontClassName} ${textVisibilityClassName}`}>
        {processing ? <WaitingSymbol color={BUTTON_WAITING_SYMBOL_COLOR_DICT[type][color]} /> : label}
      </span>
    </button>
  );
};

export default Button;
