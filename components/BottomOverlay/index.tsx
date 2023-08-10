import { type AriaRole, type ReactNode } from 'react';
import useBottomOverlayClassName from './useBottomOverlayClassName';

type BottomOverlayProps = { children: ReactNode; isOpen?: boolean; className?: string; role: AriaRole };

const BottomOverlay = ({ children, isOpen, className = '', role }: BottomOverlayProps) => {
  const refinedClassName = useBottomOverlayClassName(isOpen);

  return (
    <div role="dialog" className={`${refinedClassName} ${className}`}>
      {children}
    </div>
  );
};

export default BottomOverlay;
