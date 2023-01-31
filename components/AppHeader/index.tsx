import Button from '@/components/Button';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useMemo } from 'react';
import AppProfileMenu from '../AppProfileMenu';
import { useRecoilState } from 'recoil';
import { walletAtom } from '@/state/states';
import { useEffect } from 'react';
import useConnect from '@/connection/useConnect';
import { ChainId, WalletType } from '@/constants/connect';
import useBalance from '@/hooks/useBalance';
import { CoinId } from '@/constants/coin';
import { formatNumber } from '@/utils/number';
import Coin from '../Coin';

const AppHeader = ({ className = '' }: { className?: string }) => {
  const { connectTo } = useConnect();

  const [wallet] = useRecoilState(walletAtom);

  /** balance */
  const { totalBalanceUSD } = useBalance(ChainId.COSMOS);

  /** @todo to be a component */
  const connectedBalance = useMemo<JSX.Element | undefined>(() => {
    if (wallet === undefined) return undefined;

    return (
      <div className="flex items-center gap-x-2">
        <Coin coinId={CoinId.ATOM} pxSize={20} />
        <div className="Typeface_mono">{formatNumber(totalBalanceUSD, { fiat: true })}</div>
      </div>
    );
  }, [wallet, totalBalanceUSD]);

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
      className={`${className} w-full h-navbar bg-groundo10 backdrop-blur-2xl flex justify-between items-center gap-x-4 px-5 py-4`}
    >
      {/* left */}
      <div className="w-6 h-6 bg-red-500"></div>

      {/* right */}
      <div className="relative flex items-center gap-x-4">
        <div className="min-w-[10rem]">
          {connectedBalance ? (
            <Button
              label={connectedBalance}
              size="sm"
              color="neutral"
              type="outline"
              className="connectedWalletButton w-full"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
          ) : (
            <Button label="Connect Wallet" color="neutral" size="sm" className="w-full" onClick={onConnectWallet} />
          )}
        </div>

        <AppProfileMenu
          open={isProfileMenuOpen}
          className="AppProfileMenu absolute top-[3rem] right-0"
          onDisconnect={() => setIsProfileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default AppHeader;
