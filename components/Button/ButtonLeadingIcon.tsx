import Icon, { IconSize, IconType } from '@/components/Icon';
import type { ButtonColor, ButtonSize, ButtonType } from './types';

const ICON_COLOR_CLASS_DICT: Record<ButtonType, Record<ButtonColor | 'disabled', string>> = {
  fill: {
    primary: 'bg-white text-primary',
    primary_inverted: 'bg-primary text-white',
    secondary: 'bg-white text-secondary',
    disabled: 'bg-white text-disabled',
  },
  outline: {
    primary: 'text-primary border border-primary',
    primary_inverted: 'text-white border border-white',
    secondary: 'text-secondary border border-secondary',
    disabled: 'text-disabled',
  },
};

const ICON_INVERT_COLOR_CLASS_DICT: Record<ButtonType, Record<ButtonColor, string>> = {
  fill: {
    primary: 'bg-primary text-white',
    primary_inverted: 'bg-white text-primary',
    secondary: 'bg-secondary text-white',
  },
  outline: {
    primary: 'text-primary border border-primary',
    primary_inverted: 'text-white border border-white',
    secondary: 'text-secondary border border-secondary',
  },
};

const ICON_PADDING_CLASS_DICT: Record<ButtonSize, string> = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-5',
};

const ICON_SIZE_CLASS_DICT: Record<ButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

type ButtonLeadingIconProps = {
  type: ButtonType;
  color: ButtonColor;
  size: ButtonSize;
  iconType: IconType;
  disabled?: boolean;
};

const ButtonLeadingIcon = ({ type, color, size, iconType, disabled }: ButtonLeadingIconProps) => {
  const iconColorClassName = ICON_COLOR_CLASS_DICT[type][disabled ? 'disabled' : color];
  const iconInvertColorClassName = ICON_INVERT_COLOR_CLASS_DICT[type][color];
  const iconPaddingClassName = ICON_PADDING_CLASS_DICT[size];
  const iconSize = ICON_SIZE_CLASS_DICT[size];

  return (
    <span className={`relative rounded-full transition-all Transition_500 ${iconPaddingClassName} ${iconColorClassName}`}>
      <Icon
        type={iconType}
        size={iconSize}
        className="transition-all Transition_500 group-enabled/button:group-hover/button:translate-x-[200%] group-enabled/button:group-hover/button:opacity-0"
      />

      <span
        aria-hidden
        className={`absolute inset-0.5 flex items-center justify-center rounded-full Transition_500 transition-all origin-center scale-0 translate-x-4 opacity-0 group-enabled/button:group-hover/button:scale-100 group-hover/button:translate-x-0 group-hover/button:opacity-100 ${iconInvertColorClassName}`}
      >
        <Icon
          type={iconType}
          size={iconSize}
          className="Transition_500 transition-transform delay-75 -translate-x-[200%] group-enabled/button:group-hover/button:translate-x-0"
        />
      </span>
    </span>
  );
};

export default ButtonLeadingIcon;
