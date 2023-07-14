import { ReactNode } from 'react';

const Layout = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <main role="main" className={className}>
      {children}
    </main>
  );
};

export default Layout;
