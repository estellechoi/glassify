import { useMemo } from 'react';
import { BOTTOM_SHEET_CLASSES } from './styles';

const useBottomSheetClassName = (isOpen?: boolean) => {
  const staticClassName = useMemo<string>(() => Object.values(BOTTOM_SHEET_CLASSES).join(' '), []);
  const animateClassName = useMemo<string>(() => (isOpen ? 'Animate_fast_in_upward' : 'Animate_fast_in_upward_back'), [isOpen]);
  return useMemo<string>(() => `Component ${staticClassName} ${animateClassName}`, [staticClassName, animateClassName]);
};

export default useBottomSheetClassName;
