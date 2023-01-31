import { ReactNode } from 'react';

type FloatProps = { children: ReactNode; className?: string };

const Float = ({ children, className = '' }: FloatProps) => {
  return <div className={`${className} px-4 py-5 rounded-md bg-ground border border-gray400`}>{children}</div>;
};

export default Float;
