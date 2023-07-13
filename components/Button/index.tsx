import ButtonLeadingIcon from './ButtonLeadingIcon';
import type { ButtonColor, ButtonSize, ButtonType } from './types';
import type { IconType } from '@/components/Icon';

const BUTTON_COLOR_CLASS_DICT: Record<ButtonType, Record<ButtonColor | 'disabled', string>> = {
  fill: {
    primary: 'bg-primary text-white border border-primary',
    secondary: 'bg-secondary text-white',
    disabled: 'bg-disabled text-white',
  },
  outline: {
    primary: 'bg-transparent text-primary border border-primary',
    secondary: 'bg-transparent text-secondary border border-secondary',
    disabled: 'bg-transparent text-disabled border border-disabled',
  },
};

const TEXT_SIZE_CLASS_DICT: Record<ButtonSize, string> = {
  sm: 'Font_button_sm px-5 py-2',
  md: 'Font_button_md px-6 py-3',
  lg: 'Font_button_lg px-7 py-4',
  xl: 'Font_button_xl px-8 py-5',
};

type ButtonProps = {
  iconType: IconType;
  label: string;
  onClick?: () => void;
  labelHidden?: boolean;
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  iconType,
  label,
  onClick,
  labelHidden = false,
  type = 'fill',
  color = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const cursorClassName = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const colorClassName = labelHidden ? '' : BUTTON_COLOR_CLASS_DICT[type][disabled ? 'disabled' : color];
  const fontClassName = TEXT_SIZE_CLASS_DICT[size];
  const textVisibilityClassName = labelHidden ? 'sr-only' : '';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`Component group/button inline-flex justify-center items-center p-1.5 rounded-full transition-transform Transition_500 enabled:hover:scale-110 ${cursorClassName} ${colorClassName} ${className}`}
    >
      <ButtonLeadingIcon type={type} color={color} size={size} iconType={iconType} disabled={disabled} />
      <span className={`truncate ${fontClassName} ${textVisibilityClassName}`}>{label}</span>
    </button>
  );
};

export default Button;
