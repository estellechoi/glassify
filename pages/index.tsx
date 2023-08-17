import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import Main from '@/components/Main';
import AppHeadline from '@/components/AppHeadline';
import { userWalletAtom } from '@/store/states';
import { useCallback, useMemo, useState } from 'react';
import BalanceTokensCard from '@/components/cards/BalanceTokensCard';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});
const AppWallPaper = dynamic(() => import('@/components/AppWallPaper'));

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
  const isBalanceTokensTableOpen = useMemo<boolean>(
    () => isAppHeadlineAnimationEnd && isBalanceTokensTableLoaded,
    [isAppHeadlineAnimationEnd, isBalanceTokensTableLoaded]
  );

  return (
    <>
      <AsciiGlobe />

      <AppHeadline
        className={`fixed left-8 bottom-20 md:left-24 md:bottom-[8.125rem] transition-transform Transition_1000 ${appHeadlineTransformClassName}`}
        onAnimationEnd={onAppHeadlineAnimationEnd}
      />

      <Main className="min-h-screen">
        {userWallet && (
          <BalanceTokensCard
            wallet={userWallet}
            isOpen={isBalanceTokensTableOpen}
            onBalanceTokensTableLoaded={onBalanceTokensTableLoaded}
            className="md:mx-page_x md:mb-page_bottom"
          />
        )}
      </Main>
    </>
  );
};

export default Home;
