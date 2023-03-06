import type { IconType } from '../Icon';
import Icon from '../Icon';

type ButtonColor = 'primary' | 'secondary';
type ButtonType = 'fill' | 'outline';
type ButtonShape = 'rounded' | 'square';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const BUTTON_PAINT_DICT: {
  [key in ButtonType]: {
    [key in ButtonColor | 'disabled']: string;
  };
} = {
  fill: {
    primary: 'bg-primary text-white border border-primary hover:bg-primary_hover hover:border-primary_hover',
    secondary: 'bg-secondary text-white hover:bg-secondary_hover',
    disabled: 'bg-disabled text-white',
  },
  outline: {
    primary: 'bg-transparent text-primary border border-primary hover:border-primary_hover hover:bg-primary_linear_4',
    secondary: 'bg-transparent text-secondary border border-secondary hover:border-secondary_hover hover:bg-secondary_linear_4',
    disabled: 'bg-transparent text-disabled border border-disabled',
  },
};

const BUTTON_RADIUS_DICT: { [key in ButtonShape]: string } = {
  rounded: 'rounded-full',
  square: 'rounded-none',
};

const BUTTON_SIZE_DICT: { [key in ButtonSize]: string } = {
  sm: 'Font_button_sm px-5 py-2',
  md: 'Font_button_md px-6 py-3',
  lg: 'Font_button_lg px-7 py-4',
  xl: 'Font_button_xl px-8 py-5',
};

type ButtonProps = {
  label: string | JSX.Element;
  onClick: () => void;
  type?: ButtonType;
  color?: ButtonColor;
  shape?: ButtonShape;
  size?: ButtonSize;
  iconType?: IconType;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  label,
  onClick,
  type = 'fill',
  color = 'primary',
  shape = 'rounded',
  size = 'md',
  iconType,
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} transition-all ${BUTTON_PAINT_DICT[type][disabled ? 'disabled' : color]} ${
        BUTTON_RADIUS_DICT[shape]
      }`}
    >
      <div
        className={`inline-flex justify-center items-center gap-x-1 overflow-hidden text-ellipsis whitespace-nowrap ${
          BUTTON_SIZE_DICT[size]
        } ${disabled ? 'opacity-50' : ''}`}
      >
        {iconType && <Icon type={iconType} />}
        <div>{label}</div>
      </div>
    </button>
  );
};

export default Button;
