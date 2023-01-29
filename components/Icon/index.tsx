import React from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCheckCircle, AiOutlineCopy, AiOutlineLink, AiOutlineLogout } from 'react-icons/ai';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';

export type IconType = 'close' | 'copy' | 'link' | 'copylink' | 'checked' | 'unchecked' | 'success' | 'disconnect';

const Icons: { [key: string]: React.ElementType } = {
  close: IoMdClose,
  copy: AiOutlineCopy,
  link: AiOutlineLink,
  copylink: AiOutlineLink,
  checked: ImCheckboxChecked,
  unchecked: ImCheckboxUnchecked,
  success: AiOutlineCheckCircle,
  disconnect: AiOutlineLogout,
};

interface IconProps {
  type: IconType;
  className?: string;
}

function Icon({ type, className = '' }: IconProps) {
  const IconComponent = Icons[type];

  return (
    <IconContext.Provider
      value={{
        className: `${className} w-4 h-4`,
      }}
    >
      {/* @ts-ignore */}
      <IconComponent />
    </IconContext.Provider>
  );
}

export default Icon;
