import { ReactNode } from 'react';

type OptionProps = { children: ReactNode };

const Option = ({ children }: OptionProps) => {
  return <>{children}</>;
};

export default Option;
