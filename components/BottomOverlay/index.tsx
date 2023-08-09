import { useMemo, type AriaRole, type ReactNode } from 'react';
import useUserAgent from '@/hooks/useUserAgent';
import ScreenBackdrop from '@/components/ScreenBackdrop';

type BottomOverlayProps = { children: ReactNode; isOpen?: boolean; className?: string; role: AriaRole };

const BottomOverlay = ({ children, isOpen, className = '', role }: BottomOverlayProps) => {
  const visibilityClassName = useMemo<string>(() => (isOpen ? 'Animate_fast_in_upward' : 'hidden'), [isOpen]);

  const positionClassName = 'fixed inset-x-0 bottom-0 md:inset-x-page_x md:bottom-gap_bottom_double',
    heightClassName = 'max-h-screen_padded h-screen_top_padded_as_app_header md:h-min',
    borderClassName = 'rounded-t-2xl md:rounded-2xl border-t md:border border-primary_line',
    bgColorClassName = 'Bg_glass';

  const { isMobile } = useUserAgent();

  const Overlay = (
    <div
      role={role}
      className={`Component ${positionClassName} ${heightClassName} ${borderClassName} ${bgColorClassName} Elevation_box_4 md:Elevation_box_3 ${visibilityClassName} ${className}`}
    >
      {children}
    </div>
  );

  return isMobile ? <ScreenBackdrop isOpen={isOpen}>{Overlay}</ScreenBackdrop> : Overlay;
};

export default BottomOverlay;
