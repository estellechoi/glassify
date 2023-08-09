import { ReactNode } from 'react';

const ScreenBackdrop = ({ children, isOpen, onClick }: { children: ReactNode; isOpen?: boolean; onClick?: () => void }) => {
  const visibilityClassName = `transition-opacity Transition_1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className={`fixed inset-0 Bg_glass_transparent ${visibilityClassName}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default ScreenBackdrop;
