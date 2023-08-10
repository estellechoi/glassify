import { useMemo } from 'react';
import { BOTTOM_OVERLAY_CLASSES } from './styles';

const useBottomOverlayClassName = (isOpen?: boolean) => {
  const staticClassName = useMemo<string>(() => Object.values(BOTTOM_OVERLAY_CLASSES).join(' '), []);
  const visibilityClassName = useMemo<string>(() => (isOpen ? 'Animate_fast_in_upward' : 'hidden'), [isOpen]);
  return useMemo<string>(() => `Component ${staticClassName} ${visibilityClassName}`, [staticClassName, visibilityClassName]);
};

export default useBottomOverlayClassName;
