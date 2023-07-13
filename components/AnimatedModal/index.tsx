export type AnimatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  children?: React.ReactNode;
};

const AnimatedModal = ({ isOpen, onClose, ariaLabel, children }: AnimatedModalProps) => {
  const leftAnimationClassName = isOpen ? 'Animate_fast_in_downward' : 'Animate_fast_in_downward_back';
  const rightAnimationClassName = isOpen ? 'Animate_fast_in_upward' : 'Animate_fast_in_upward_back';
  const contentOpacityClassName = isOpen ? 'animate-fade_in delay-800' : 'opacity-0';

  return (
    <div role="dialog" aria-label={ariaLabel} className="Component fixed inset-0 grid grid-cols-1 md:grid-cols-[20vw_1fr]">
      <div aria-hidden className={`hidden md:block bg-primary_variant_dark ${leftAnimationClassName}`}></div>

      <div className={`bg-primary ${rightAnimationClassName}`}>
        <div className={`h-full ${contentOpacityClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default AnimatedModal;
