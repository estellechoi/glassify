import { ReactNode } from 'react';

type FloatProps = { children: ReactNode; className?: string };

const Float = ({ children, className = '' }: FloatProps) => {
  return <div className={`${className} rounded-md bg-ground border border-gray300`}>{children}</div>;
};

export default Float;
