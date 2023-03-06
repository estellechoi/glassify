import { ReactNode } from 'react';

const Card = ({ children, weak = false, className = '' }: { children: ReactNode; weak?: boolean; className?: string }) => {
  return (
    <div className={`px-12 py-[3.25rem] ${weak ? 'bg-secondary_linear_2' : 'bg-secondary_linear_4'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
