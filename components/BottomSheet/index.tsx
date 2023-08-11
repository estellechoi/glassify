import { type ReactNode } from 'react';
import type { OverlayProps } from '@/components/types';
import useBottomSheetClassName from './useBottomSheetClassName';
import OverlayBackdrop from '@/components/OverlayBackdrop';

type BottomSheetProps = OverlayProps & { children: ReactNode; className?: string };

const BottomSheet = ({ children, id, isOpen, onClose, className = '' }: BottomSheetProps) => {
  const refinedClassName = useBottomSheetClassName(isOpen);

  return (
    <>
      <OverlayBackdrop isOpen={isOpen} onClick={onClose} />

      <div role="dialog" id={id} className={`${refinedClassName} ${className}`}>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
