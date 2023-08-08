import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import AppHeadline from '@/components/AppHeadline';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import { useCallback, useMemo, useState } from 'react';
import AnimatedHeadline from '@/components/AnimatedHeadline';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});
const BalanceTokensTable = dynamic(() => import('@/components/tables/BalanceTokensTable'));

const Home: NextPage = () => {
  const [userWallet] = useAtom(userWalletAtom);

  const [isAppHeadlineAnimationEnd, setIsAppHeadlineAnimationEnd] = useState<boolean>(false);
  const onAppHeadlineAnimationEnd = useCallback(() => setIsAppHeadlineAnimationEnd(true), []);

  const appHeadlineTransformClassName = useMemo<string>(
    () => (!!userWallet && isAppHeadlineAnimationEnd ? '-translate-x-[calc(100%_+_7rem)]' : ''),
    [userWallet, isAppHeadlineAnimationEnd]
  );

  const [isBalanceTokensTableLoaded, setIsBalanceTokensTableLoaded] = useState<boolean>(false);
  const onBalanceTokensTableLoaded = useCallback(() => setIsBalanceTokensTableLoaded(true), []);
  const balanceTokensTableAnimationClassName = useMemo<string>(
    () => (isAppHeadlineAnimationEnd && isBalanceTokensTableLoaded ? 'Animate_fast_in_upward' : 'hidden'),
    [isAppHeadlineAnimationEnd, isBalanceTokensTableLoaded]
  );

  return (
    <>
      <AsciiGlobe />

      <AppHeadline
        className={`fixed left-8 bottom-20 md:left-24 md:bottom-[8.125rem] transition-transform Transition_1000 ${appHeadlineTransformClassName}`}
        onAnimationEnd={onAppHeadlineAnimationEnd}
      />

      {userWallet && (
        <article className={`Component fixed inset-x-0 bottom-0 h-min md:Padding_page ${balanceTokensTableAnimationClassName}`}>
          <AnimatedHeadline tagName="h3" texts={['Tokens']} className="pl-2 mb-3" />
          <BalanceTokensTable wallet={userWallet} onLoaded={onBalanceTokensTableLoaded} />
        </article>
      )}

      <Layout>
        <></>
      </Layout>
    </>
  );
};

export default Home;
