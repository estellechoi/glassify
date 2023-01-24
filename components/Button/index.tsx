type ButtonSize = 'md';

const BUTTON_GRID_DICT: { [key in ButtonSize]: string } = {
  md: 'px-4 py-3',
};

type ButtonProps = {
  label: string;
  onClick: () => void;
  size?: ButtonSize;
};

const Button = ({ label, onClick, size = 'md' }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-transparent backdrop-blur-xl shadow-md shadow-whiteo10 ${BUTTON_GRID_DICT[size]}`}
    >
      {label}
    </button>
  );
};

export default Button;
