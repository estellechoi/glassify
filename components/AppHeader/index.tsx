import AppLogo from '@/components/AppLogo';
import dynamic from 'next/dynamic';

const AccountButton = dynamic(() => import('@/components/buttons/AccountButton'), {
  ssr: false,
});

type AppHeaderProps = { className?: string };

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  return (
    <header className={`h-app_header flex items-center justify-between px-8 py-9 ${className}`}>
      <AppLogo size="lg" color="dark" />
      <AccountButton />
    </header>
  );
};

export default AppHeader;
