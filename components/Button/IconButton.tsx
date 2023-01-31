import Icon, { IconType } from '../Icon';

type IconButtonProps = {
  type: IconType;
  onClick?: () => void;
  iconClassName?: string;
  className?: string;
};

const IconButton = ({ type, onClick, iconClassName = '', className = '' }: IconButtonProps) => {
  return (
    <button type="button" className={`${className} w-8 h-8 flex justify-center items-center hover:opacity-80`} onClick={onClick}>
      <Icon type={type} className={iconClassName} />
    </button>
  );
};

export default IconButton;
