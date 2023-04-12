import Button from '@/components/Button';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { walletAtom } from '@/store/atoms';
import { useEffect } from 'react';
import useConnect from '@/connection/useConnect';
import { WalletType } from '@/constants/connect';
import { formatNumber } from '@/utils/number';
import CoinList from '../CoinList';
import Image from 'next/image';
import LogoLightSvg from '@/resources/logos/logo_light.svg';
import Link from 'next/link';

const AppHeader = ({ className = '' }: { className?: string }) => {
  const { connectTo } = useConnect();

  const [wallet] = useRecoilState(walletAtom);

  /** balance */
  // const { totalBalanceUSD, holdings } = useBalance();

  /** @todo to be a component */
  const connectedBalance = useMemo<JSX.Element | undefined>(() => {
    if (wallet === undefined) return undefined;

    return (
      <div className="flex items-center gap-x-2">
        {/* <CoinList coinIds={holdings.map((holding) => holding.coinGeckoId)} pxSize={20} /> */}
        {/* <div className="Typeface_mono">{formatNumber(totalBalanceUSD, { fiat: true })}</div> */}
      </div>
    );
  }, [wallet]);

  const onConnectWallet = useCallback(() => {
    connectTo(WalletType.KEPLR);
  }, [connectTo]);

  /** profile menu toggle */
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const onClickMenuClose = useCallback((evt: Event) => {
    if (
      evt.target instanceof HTMLElement &&
      // !evt.target.matches('.AppProfileMenu') &&
      // !evt.target.matches('.connectedWalletButton')
      !evt.target.closest('.AppProfileMenu') &&
      !evt.target.closest('.connectedWalletButton')
    ) {
      setIsProfileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onClickMenuClose);
    return () => window.removeEventListener('click', onClickMenuClose);
  }, []);

  return (
    <header
      className={`${className} w-full h-navbar bg-ground_o backdrop-blur-2xl flex justify-between items-center gap-x-4 px-5 py-4`}
    >
      {/* left */}
      <Link href="/">
        <Image src={LogoLightSvg} alt="Paper logo" width={40} height={20} />
      </Link>

      {/* right */}
      <div className="relative flex items-center gap-x-4">
        <div className="min-w-[10rem]">
          {connectedBalance ? (
            <Button
              label={connectedBalance}
              size="sm"
              color="secondary"
              type="outline"
              className="connectedWalletButton w-full"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
          ) : (
            <Button label="Connect Wallet" color="secondary" size="sm" className="w-full" onClick={onConnectWallet} />
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
