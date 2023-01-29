import Button from '@/components/Button';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { getAbbrOf } from '@/utils/text';
import { useMemo } from 'react';
import KeplrLogo from '@/resources/svgs/keplr_logo.svg';
import AppProfileMenu from '../AppProfileMenu';
import { useRecoilState } from 'recoil';
import { walletAtom } from '@/state/states';
import { useEffect } from 'react';

type Wallet = {
  address: string;
};

const AppHeader = ({ className = '' }: { className?: string }) => {
  const [wallet, setWallet] = useRecoilState(walletAtom);

  const connectedUser = useMemo<JSX.Element | undefined>(() => {
    if (wallet === undefined) return undefined;

    return (
      <div className="flex items-center gap-x-2">
        <Image src={KeplrLogo} alt="Keplr Wallet Logo" width={20} height={20} className="grow-0 shrink-0" />
        <div>{getAbbrOf(wallet.address, 10)}</div>
      </div>
    );
  }, [wallet]);

  const onConnectWallet = useCallback(() => {
    setWallet({ address: 'cosmos424lkdfjdhfwlelkfslkdjfosflkdllslslsl' });
  }, [setWallet]);

  /** profile menu toggle */
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const onClickMenuClose = useCallback((evt: Event) => {
    if (
      evt.target instanceof HTMLElement &&
      !evt.target.closest('.AppProfileMenu') &&
      !evt.target.closest('.ConnectedUserButton')
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
      className={`${className} relative w-full h-navbar bg-blend-saturation flex justify-between items-center gap-x-4 px-5 py-2`}
    >
      {/* left */}
      <Image src="https://static.coinpaprika.com/coin/usdt-tether/logo.png" width={24} height={24} />

      {/* right */}
      <div className="relative flex items-center gap-x-4">
        <div className="min-w-[11.25rem]">
          {connectedUser ? (
            <Button
              label={connectedUser}
              size="sm"
              type="outline"
              className="ConnectedUserButton w-full"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
          ) : (
            <Button label="Connect Wallet" size="sm" className="w-full" onClick={onConnectWallet} />
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
