import React from 'react';
import { IconContext } from 'react-icons';
import {
  AiOutlineLink,
} from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineContentCopy } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';

export type IconType =
  | 'close'
  | 'copy'
  | 'link'
  | 'copylink'
  | 'checked'
  | 'unchecked'
  | 'success';

const Icons: { [key: string]: React.ElementType } = {
  close: IoMdClose,
  copy: MdOutlineContentCopy,
  link: BiLinkExternal,
  copylink: AiOutlineLink,
  checked: ImCheckboxChecked,
  unchecked: ImCheckboxUnchecked,
  success: FaRegCheckCircle
};

interface IconProps {
  type: IconType
  className?: string
}

function Icon({ type, className = '' }: IconProps) {
  const IconComponent = Icons[type];
  //   as ReactNode

  return (
    <IconContext.Provider
      value={{
        className,
      }}
    >
      {/* @ts-ignore */}
      <IconComponent />
    </IconContext.Provider>
  );
}

export default Icon;
