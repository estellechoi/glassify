import type { ReactNode } from 'react';

const Content = ({ isOpen, className = '', children }: { isOpen: boolean; className?: string; children: ReactNode }) => {
  const contentOpacityClassName = isOpen ? 'animate-fade_in delay-800' : 'animate-fade_out delay-800';

  return <div className={`w-full h-full ${contentOpacityClassName} ${className}`}>{children}</div>;
};

export default Content;
