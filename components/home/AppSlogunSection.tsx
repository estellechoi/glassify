import { useCallback, useMemo, useState } from 'react';
import AppSlogunDisplacingCanvas from '@/components/canvases/AppSlogunDisplacingCanvas';
import useDebounce from '@/hooks/useDebounce';

const AppSlogunSection = ({ className = '' }: { className?: string }) => {
  /**
   *
   * @description app slogun fading out animation
   */
  const [isAppSlogunInteracted, setIsAppSlogunInteracted] = useState<boolean>(false);

  const [collapseAppSlogun, setCollapseAppSlogun] = useState<boolean>(false);

  const appSlogunVisibilityClassName = useMemo<string>(
    () => (isAppSlogunInteracted && !collapseAppSlogun ? 'animate-fade_out' : isAppSlogunInteracted ? 'opacity-0' : ''),
    [isAppSlogunInteracted, collapseAppSlogun]
  );

  const debouncedCollapseAppSlogun = useDebounce(collapseAppSlogun, 500);
  const appSlogunCollapseClassName = useMemo<string>(
    () =>
      `border border-solid border-transparent overflow-hidden transition-[max-height] Transition_500 ${
        debouncedCollapseAppSlogun ? 'max-h-0' : 'max-h-screen_exept_app_header'
      }`,
    [debouncedCollapseAppSlogun]
  );

  const onAppSlogunFadingOutAnimationEnd = useCallback(() => {
    setCollapseAppSlogun(true);
  }, []);

  const onAppSlogunCanvasPointerFirstOut = useCallback(() => {
    setIsAppSlogunInteracted(true);
  }, []);

  const sizeClassName = 'w-full h-screen_exept_app_header';
  const gridClassName = 'flex items-end md:items-center justify-center';
  const paddingClassName = 'px-page_x_mobile md:px-page_x pb-app_header_height md:pb-0';

  return (
    <section
      className={`relative ${sizeClassName} ${gridClassName} ${paddingClassName} ${appSlogunVisibilityClassName} ${appSlogunCollapseClassName} ${className}`}
      onAnimationEnd={onAppSlogunFadingOutAnimationEnd}
    >
      <AppSlogunDisplacingCanvas className="w-full" onPointerFirstOut={onAppSlogunCanvasPointerFirstOut} />
    </section>
  );
};

export default AppSlogunSection;
