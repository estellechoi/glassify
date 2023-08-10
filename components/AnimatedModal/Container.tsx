import type { ReactNode } from 'react';
import OverlayBackdrop from '@/components/OverlayBackdrop';
import getReactElements from '@/components/utils/getReactElements';
import Content from './Content';
import BottomBar from './BottomBar';

const getContent = (children: ReactNode) => getReactElements(children, Content);
const getBottomBar = (children: ReactNode) => getReactElements(children, BottomBar);

type AnimatedModalSize = 'md';

const MODAL_WIDTH_DICT: Record<AnimatedModalSize, string> = {
  md: 'w-screen md:w-[20rem]',
};

export type AnimatedModalProps = {
  id?: string;
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
const AnimatedModal = ({ id, isOpen, onClose, size = 'md', ariaLabel, children, className = '' }: AnimatedModalProps) => {
  const widthClassName = MODAL_WIDTH_DICT[size];
  const animateClassName = isOpen ? 'Animate_slide_in_leftward' : 'Animate_slide_in_leftward_back';

  return (
    <>
      <OverlayBackdrop isOpen={isOpen} onClick={onClose} />

      <div
        id={id}
        role="dialog"
        aria-modal
        aria-label={ariaLabel}
        className={`Component fixed z-top_context top-0 right-0 h-screen md:top-modal_margin_y md:right-modal_margin_x md:h-modal_height rounded-tl-2xl rounded-bl-2xl md:rounded-2xl bg-primary Elevation_box_3 ${widthClassName} ${animateClassName} ${className}`}
      >
        {getContent(children)}
        {getBottomBar(children)}
      </div>
    </>
  );
};

export default AnimatedModal;
