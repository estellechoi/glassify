import { Children, ReactNode, isValidElement } from 'react';
import Content from './Content';
import BottomBar from './BottomBar';

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
  md: 'w-[calc(100vw_-_2.5rem)] md:w-[20rem]',
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
    <div
      role="dialog"
      aria-modal
      aria-label={ariaLabel}
      className={`Component fixed top-28 right-5 md:right-10 max-h-[80vh] rounded-3xl bg-primary ${widthClassName} ${animateClassName} ${className}`}
    >
      {getContent(children)}
      {getBottomBar(children)}
    </div>
  );
};

export default AnimatedModal;
