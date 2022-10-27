import { ButtonHTMLAttributes, useCallback } from 'react';
import { useCopyClipboard } from './hook';
import Icon from '../Icon';

interface BaseProps {
  toCopy: string
  iconPosition?: 'left' | 'right'
}

type CopyHelperProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export default function CopyHelper({ toCopy, children, iconPosition }: CopyHelperProps) {
  const [isCopied, setCopied] = useCopyClipboard();
  const copy = useCallback(() => {
    setCopied(toCopy);
  }, [toCopy, setCopied]);

  return (
    <div className="relative shrink-0 inline-flex justify-start items-center TYPO-BODY-S cursor-pointer" onClick={copy}>
      {iconPosition === 'left' ? isCopied ? <Icon type="success" className="mr-2" /> : null : null}
      {isCopied ? 'Copied' : children}
      {iconPosition === 'right' ? isCopied ? <Icon type="success" className="ml-2" /> : null : null}
    </div>
  );
}
