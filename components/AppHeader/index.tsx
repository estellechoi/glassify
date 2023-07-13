import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import AppLogo from '@/components/AppLogo';
import { userWalletAtom } from '@/store/states';
import { shortenAddress } from '@/utils/text';
import useWallets from '@/connection/useWallets';
import useAutoConnect from '@/connection/useAutoConnect';
import type { IconType } from '@/components/Icon';

const SelectWalletModal = lazy(() => import('@/components/modals/SelectWalletModal'));

type AppHeaderProps = { className?: string };

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [userWallet, setUserWallet] = useAtom(userWalletAtom);

  const wallets = useWallets();
  const autoConnect = useAutoConnect(wallets);

  useEffect(() => {
    autoConnect();
  }, []);

  const modal = useModal();
  const openConnectModal = useCallback(async () => {
    setIsConnectModalOpen(true);
    await modal.open((props) => (
      <Suspense>
        <SelectWalletModal {...props} wallets={wallets} onConnect={setUserWallet} />
      </Suspense>
    ));
    setIsConnectModalOpen(false);
  }, [modal, wallets, setUserWallet]);

  const closeConnectModal = useCallback(() => {
    modal.close();
    setIsConnectModalOpen(false);
  }, [modal]);

  const connectModalButtonProps = useMemo(() => {
    const label = isConnectModalOpen ? 'Close' : 'Connect';
    const onClick = isConnectModalOpen ? closeConnectModal : openConnectModal;

    const iconType: IconType = isConnectModalOpen ? 'close' : 'login';
    const labelHidden = isConnectModalOpen;

    return {
      iconType,
      label,
      onClick,
      labelHidden,
    };
  }, [isConnectModalOpen, closeConnectModal, openConnectModal]);

  return (
    <header className={`flex items-center justify-between px-8 py-9 ${className}`}>
      <AppLogo size="lg" color={isConnectModalOpen ? 'light' : 'dark'} />

      {userWallet?.connector?.account ? (
        <Button size="sm" iconType="menu" label={shortenAddress(userWallet.connector.account)} />
      ) : (
        <Button size="md" {...connectModalButtonProps} />
      )}
    </header>
  );
};

export default AppHeader;
