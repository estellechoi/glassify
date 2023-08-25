import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import Main from '@/components/Main';
import { userWalletAtom } from '@/store/states';
import { useCallback, useMemo, useState } from 'react';
import GainersLosersTables from '@/components/tables/GainersLosersTables';
import BalanceTokensTable from '@/components/tables/BalanceTokensTable';
import ExchangesTable from '@/components/tables/ExchangesTable';
import DisplacementCanvas from '@/components/DisplacementCanvas';
import StayEffortlessImg from '@/resources/images/tg_stay_effortless.png';
import StillEarningImg from '@/resources/images/tg_still_achieving.png';
// import DisplacementImg from '@/resources/textures/texture_noise.jpg';
import DisplacementImg from '@/resources/textures/texture_blocks_random.jpg';

const AsciiGlobe = dynamic(() => import('@/components/AsciiGlobe'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [userWallet] = useAtom(userWalletAtom);

  const [isAppHeadlineAnimationEnd, setIsAppHeadlineAnimationEnd] = useState<boolean>(false);
  const onAppHeadlineAnimationEnd = useCallback(() => setIsAppHeadlineAnimationEnd(true), []);

  const appHeadlineTransformClassName = useMemo<string>(
    () =>
      !!userWallet && isAppHeadlineAnimationEnd ? '-translate-x-[calc(100%_+_2rem)] md:-translate-x-[calc(100%_+_10rem)]' : '',
    [userWallet, isAppHeadlineAnimationEnd]
  );

  const [isBalanceTokensTableLoaded, setIsBalanceTokensTableLoaded] = useState<boolean>(false);
  const onBalanceTokensTableLoaded = useCallback(() => setIsBalanceTokensTableLoaded(true), []);

  return (
    <>
      <AsciiGlobe className="fixed inset-0" />

      <Main className="min-h-screen pt-app_header_height pb-page_bottom">
        <section className="relative w-full h-screen_exept_app_header flex items-center justify-center px-page_x_mobile md:px-page_x md:mb-page_bottom">
          <DisplacementCanvas
            className="w-full overflow-hidden"
            textureImage1={StayEffortlessImg}
            textureImage2={StillEarningImg}
            displacementImage={DisplacementImg}
          />
          {/* <MosaiqedCanvas className="w-screen h-screen" /> */}
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
