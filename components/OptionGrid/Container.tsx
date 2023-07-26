import { Children, isValidElement, type ReactNode } from 'react';
import Option from './Option';

const getOptions = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === Option);
};

const Container = ({ children, className = '' }: { className?: string; children: ReactNode }) => {
  return <ul className={`flex flex-col items-start gap-1 ${className}`}>{getOptions(children)}</ul>;
};

export default Container;
