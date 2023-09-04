import dynamic from 'next/dynamic';
import Link from 'next/link';
import AppLogo from '@/components/AppLogo';
import useAppHeaderClassName from './useAppHeaderClassName';

const AccountButton = dynamic(() => import('@/components/buttons/AccountButton'), {
  ssr: false,
});

type AppHeaderProps = { className?: string };

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  const defaultClassName = useAppHeaderClassName();

  return (
    <header className={`${defaultClassName} ${className}`}>
      <Link href="/">
        <AppLogo size="lg" color="dark" />
      </Link>

      <AccountButton className="animate-fade_in_x_reverse" />
    </header>
  );
};

export default AppHeader;
