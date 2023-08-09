import { Children, ReactNode, isValidElement } from 'react';
import Content from './Content';
import BottomBar from './BottomBar';
import ScreenBackdrop from '@/components/ScreenBackdrop';

const getContent = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === Content).slice(0, 2);
};

const getBottomBar = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === BottomBar).slice(0, 2);
};

type AnimatedModalSize = 'md';

const MODAL_WIDTH_DICT: Record<AnimatedModalSize, string> = {
  md: 'w-screen md:w-[20rem]',
};

export type AnimatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: AnimatedModalSize;
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 *
 * @todo consider replacing with dialog tag with open attribute and show method
 */
const AnimatedModal = ({ isOpen, onClose, size = 'md', ariaLabel, children, className = '' }: AnimatedModalProps) => {
  const widthClassName = MODAL_WIDTH_DICT[size];
  const animateClassName = isOpen ? 'Animate_slide_in_leftward' : 'Animate_slide_in_leftward_back';

  return (
    <ScreenBackdrop isOpen={isOpen}>
      <div
        role="dialog"
        aria-modal
        aria-label={ariaLabel}
        className={`Component fixed top-app_header right-0 md:right-10 h-screen_top_padded_as_app_header md:h-screen_padded rounded-tl-2xl rounded-bl-2xl md:rounded-2xl bg-primary Elevation_box_3 ${widthClassName} ${animateClassName} ${className}`}
      >
        {getContent(children)}
        {getBottomBar(children)}
      </div>
    </ScreenBackdrop>
  );
};

export default AnimatedModal;
