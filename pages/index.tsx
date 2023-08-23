import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import Main from '@/components/Main';
import AppHeadline from '@/components/AppHeadline';
import { userWalletAtom } from '@/store/states';
import { useCallback, useMemo, useState } from 'react';
import GainersLosersTables from '@/components/tables/GainersLosersTables';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';
import ExchangesTable from '@/components/tables/ExchangesTable';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [userWallet] = useAtom(userWalletAtom);

  const [isAppHeadlineAnimationEnd, setIsAppHeadlineAnimationEnd] = useState<boolean>(false);
  const onAppHeadlineAnimationEnd = useCallback(() => setIsAppHeadlineAnimationEnd(true), []);

  const appHeadlineTransformClassName = useMemo<string>(
    () =>
      !!userWallet && isAppHeadlineAnimationEnd ? '-translate-x-[calc(100%_+_2rem)] md:-translate-x-[calc(100%_+_7rem)]' : '',
    [userWallet, isAppHeadlineAnimationEnd]
  );

  const [isBalanceTokensTableLoaded, setIsBalanceTokensTableLoaded] = useState<boolean>(false);
  const onBalanceTokensTableLoaded = useCallback(() => setIsBalanceTokensTableLoaded(true), []);

  return (
    <>
      <AsciiGlobe className="fixed inset-0" />

      <Main className="min-h-screen pt-app_header_height pb-page_bottom">
        <section className="relative h-screen">
          <AppHeadline
            className={`absolute left-8 bottom-page_padding_safe_bottom md:left-24 md:bottom-48 transition-transform Transition_1000 ${appHeadlineTransformClassName}`}
            onAnimationEnd={onAppHeadlineAnimationEnd}
          />
        </section>

        {userWallet && (
          <BalanceTokensTable
            tooltipContext="base"
            wallet={userWallet}
            // isOpen={isBalanceTokensTableOpen}
            onLoaded={onBalanceTokensTableLoaded}
            className="md:mx-page_x md:mb-page_bottom"
          />
        )}

        <GainersLosersTables className="md:mx-page_x md:mb-page_bottom" />

        <ExchangesTable className="md:mx-page_x md:mb-page_bottom" />
      </Main>
    </>
  );
};

export default Home;
