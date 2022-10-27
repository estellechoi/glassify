import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="px-24 py-10">{children}</div>;
}
