import type { IconType } from '../Icon';
import Icon from '../Icon';

type ButtonColor = 'primary' | 'neutral';
type ButtonType = 'fill' | 'outline';
type ButtonShape = 'rounded' | 'square';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const BUTTON_PAINT_DICT: {
  [key in ButtonType]: {
    [key in ButtonColor]: string;
  };
} = {
  fill: {
    primary: 'bg-primary text-black border border-primary hover:bg-primary_hover hover:border-primary_hover',
    neutral: 'bg-transparent text-gray200 border border-gray200 hover:bg-white hover:border-white',
  },
  outline: {
    primary:
      'bg-transparent text-primary border border-primary hover:text-primary_hover hover:bg-primary_hovero10 hover:border-primary_hover',
    neutral: 'bg-transparent text-gray200 border border-gray200 hover:text-white hover:bg-whiteo10 hover:border-white',
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
  className = '',
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} inline-flex justify-center items-center gap-x-1 overflow-hidden text-ellipsis whitespace-nowrap backdrop-blur-xl transition-all ${BUTTON_PAINT_DICT[type][color]} ${BUTTON_RADIUS_DICT[shape]} ${BUTTON_SIZE_DICT[size]}`}
    >
      {iconType && <Icon type={iconType} />}
      <div>{label}</div>
    </button>
  );
};

export default Button;
