import Image from 'next/image';
import AppGradientImgURL from '@/resources/images/app_gradient.png';

type AppWallPaperProps = {
  show?: boolean;
};

/**
 *
 * @description Next.js Image component is preferred to CSS background image because of performance.
 */
const AppWallPaper = ({ show }: AppWallPaperProps) => {
  const visibilityClassName = show ? 'Filter_darken opacity-0' : 'opacity-40';
  const visibilityTransitionClassName = `transition-[filter,opacity] Transition_3000 ${visibilityClassName}`;

  return (
    <div aria-hidden className={`fixed z-base inset-0 w-screen h-screen pointer-events-none ${visibilityTransitionClassName}`}>
      <Image fill src={AppGradientImgURL} alt="app background" className="text-[0] text-transparent" />
    </div>
  );
};

export default AppWallPaper;
