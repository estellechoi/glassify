import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main role="main" className="px-24 py-10">
      {children}
    </main>
  );
}
