import React from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCheckCircle, AiOutlineLink, AiOutlineLogout } from 'react-icons/ai';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { MdContentCopy, MdLogin, MdMenu } from 'react-icons/md';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconType =
  | 'close'
  | 'copy'
  | 'link'
  | 'copylink'
  | 'checked'
  | 'unchecked'
  | 'success'
  | 'disconnect'
  | 'login'
  | 'menu';

const ICON_SIZE_CLASS_DICT: Record<IconSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-9 h-9',
};

const ICON_DICT: Record<IconType, React.ElementType> = {
  close: IoMdClose,
  copy: MdContentCopy,
  link: AiOutlineLink,
  copylink: AiOutlineLink,
  checked: ImCheckboxChecked,
  unchecked: ImCheckboxUnchecked,
  success: AiOutlineCheckCircle,
  disconnect: AiOutlineLogout,
  login: MdLogin,
  menu: MdMenu,
};

type IconProps = {
  type: IconType;
  size?: IconSize;
  className?: string;
};

const Icon = ({ type, size = 'md', className = '' }: IconProps) => {
  const IconComponent = ICON_DICT[type];
  const sizeClassName = ICON_SIZE_CLASS_DICT[size];

  return (
    <IconContext.Provider
      value={{
        className: `${sizeClassName} ${className}`,
      }}
    >
      <IconComponent />
    </IconContext.Provider>
  );
};

export default Icon;
