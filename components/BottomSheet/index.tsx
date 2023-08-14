import { type ReactNode } from 'react';
import type { OverlayProps } from '@/components/types';
import useBottomSheetClassName from './useBottomSheetClassName';
import OverlayBackdrop from '@/components/OverlayBackdrop';
import Handle from './Handle';
import useBottomSheetTouchDrag from './useBottomSheetTouchDrag';

type BottomSheetProps = OverlayProps & { children: ReactNode; className?: string };

const BottomSheet = ({ children, id, isOpen, onClose, className = '' }: BottomSheetProps) => {
  const touchDrag = useBottomSheetTouchDrag({ onDragEnd: onClose });
  const refinedClassName = useBottomSheetClassName(isOpen);

  return (
    <>
      <OverlayBackdrop isOpen={isOpen} onClick={onClose} />

      <div ref={touchDrag.ref} role="dialog" id={id} className={`${refinedClassName} ${className}`}>
        <Handle className="absolute top-2 inset-x-0" />
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
