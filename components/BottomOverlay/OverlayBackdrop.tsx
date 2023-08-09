import { ReactNode } from 'react';

const OverlayBackdrop = ({ children, isOpen, onClick }: { children: ReactNode; isOpen?: boolean; onClick?: () => void }) => {
  const visibilityClassName = `transition-opacity Transition_1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className={`fixed inset-0 bg-white_o70 ${visibilityClassName}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default OverlayBackdrop;
