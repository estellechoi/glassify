// import Image from 'next/image';
// import AppGradientImgURL from '@/resources/images/app_gradient.png';
import FluidGlow from '@/components/svgs/FluidGlow';
import EllipseGlow from '@/components/svgs/EllipseGlow';

type AppWallPaperProps = {
  show?: boolean;
};

/**
 *
 * @description Next.js Image component is preferred to CSS background image because of performance.
 */
const AppWallPaper = ({ show }: AppWallPaperProps) => {
  const visibilityClassName = show ? 'Filter_brighten opacity-100' : 'opacity-0';
  const visibilityTransitionClassName = `transition-[filter,opacity,background-color] Transition_3000 ${visibilityClassName}`;

  return (
    <>
      <div className={`Component fixed z-wall inset-0 w-screen h-screen pointer-events-none ${visibilityTransitionClassName}`}>
        {/* <Image fill src={AppGradientImgURL} alt="yellowish gradient background" className="text-[0] text-transparent" /> */}
        <EllipseGlow className={`fixed z-base top-1/5 -left-1/4 w-1/2 h-1/2 bg-effected_gradient`} />
        <EllipseGlow className={`fixed z-base top-1/4 left-[10%] w-1/4 h-1/4 bg-effected`} />
        <FluidGlow className={`fixed z-base left-1/2 w-1/2 h-1/2 bg-effected_whitened`} />
        <FluidGlow className={`fixed z-base bottom-1/3 left-1/3 w-1/3 h-1/3 bg-effected_whitened_varient_light`} />
      </div>
    </>
  );
};

export default AppWallPaper;
