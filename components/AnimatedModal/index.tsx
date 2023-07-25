type AnimatedModalSize = 'md';

const MODAL_WIDTH_DICT: Record<AnimatedModalSize, string> = {
  md: 'w-[20rem]',
};

export type AnimatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: AnimatedModalSize;
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
};

const AnimatedModal = ({ isOpen, onClose, size = 'md', ariaLabel, children, className = '' }: AnimatedModalProps) => {
  const widthClassName = MODAL_WIDTH_DICT[size];
  const animateClassName = isOpen ? 'Animate_slide_in_leftward' : 'Animate_slide_in_leftward_back';
  const contentOpacityClassName = isOpen ? 'animate-fade_in delay-800' : 'animate-fade_out delay-800';

  return (
    <div
      role="dialog"
      aria-label={ariaLabel}
      className={`Component fixed top-28 right-10 max-h-[70vh] rounded-3xl bg-primary ${widthClassName} ${animateClassName} ${className}`}
    >
      <div className={`w-full h-full ${contentOpacityClassName}`}>{children}</div>
    </div>
  );
};

export default AnimatedModal;
