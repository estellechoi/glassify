import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import Main from '@/components/Main';
import GainersLosersTables from '@/components/tables/GainersLosersTables';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';
import ExchangesTable from '@/components/tables/ExchangesTable';
import AppSlogunSection from '@/components/home/AppSlogunSection';
import MobileAppLaunchSection from '@/components/home/MobileAppLaunchSection';
import useUserAgent from '@/hooks/useUserAgent';

const AsciiGlobe = dynamic(() => import('@/components/canvases/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [userWallet] = useAtom(userWalletAtom);

  const [isBalanceTokensTableLoaded, setIsBalanceTokensTableLoaded] = useState<boolean>(false);
  const onBalanceTokensTableLoaded = useCallback(() => setIsBalanceTokensTableLoaded(true), []);

  const { isMobile } = useUserAgent();
  const [isAppLaunched, setIsAppLaunched] = useState<boolean>(!isMobile);

  return (
    <>
      <AsciiGlobe className={`fixed inset-0 ${isAppLaunched ? 'hidden md:block' : ''}`} />

      {!isAppLaunched && <MobileAppLaunchSection onClickLaunch={() => setIsAppLaunched(true)} />}

      {isAppLaunched && (
        <Main className="min-h-screen pt-app_header_height pb-page_bottom">
          <AppSlogunSection className="hidden md:flex" />

          {userWallet && (
            <BalanceTokensTable
              tooltipContext="base"
              wallet={userWallet}
              onLoaded={onBalanceTokensTableLoaded}
              className="mt-20 md:mx-page_x"
            />
          )}

          <GainersLosersTables tooltipLayer="base" className="mt-20 md:mx-page_x" />

          <ExchangesTable tooltipLayer="base" className="mt-20 md:mx-page_x" />
        </Main>
      )}
    </>
  );
};

export default Home;
