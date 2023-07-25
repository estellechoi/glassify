import ButtonLeadingIcon from './ButtonLeadingIcon';
import { BUTTON_COLOR_CLASS_DICT, BUTTON_PADDING_CLASS_DICT, TEXT_SIZE_CLASS_DICT } from './constants';
import type { ButtonColor, ButtonSize, ButtonType } from './types';
import type { IconType } from '@/components/Icon';

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
  const paddingClassName = BUTTON_PADDING_CLASS_DICT[size];
  const textVisibilityClassName = labelHidden ? 'sr-only' : '';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`Component group/button inline-flex justify-center items-center rounded-full transition-transform Transition_500 enabled:hover:scale-110 ${paddingClassName} ${cursorClassName} ${colorClassName} ${className}`}
    >
      <ButtonLeadingIcon type={type} color={color} size={size} iconType={iconType} disabled={disabled} />
      <span className={`truncate ${fontClassName} ${textVisibilityClassName}`}>{label}</span>
    </button>
  );
};

export default Button;
