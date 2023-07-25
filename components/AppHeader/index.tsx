import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import AppLogo from '@/components/AppLogo';
import { userWalletAtom } from '@/store/states';
import { shortenAddress } from '@/utils/text';
import useWallets from '@/connection/useWallets';
import useAutoConnect from '@/connection/useAutoConnect';
import type { IconType } from '@/components/Icon';
import type { ButtonColor } from '../Button/types';

const SelectWalletModal = lazy(() => import('@/components/modals/SelectWalletModal'));
const AccountModal = lazy(() => import('@/components/modals/AccountModal'));

type AppHeaderProps = { className?: string };

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userWallet, setUserWallet] = useAtom(userWalletAtom);

  const wallets = useWallets();
  useAutoConnect(wallets);

  const modal = useModal();
  const openConnectModal = useCallback(async () => {
    setIsModalOpen(true);
    await modal.open((props) => (
      <Suspense>
        <SelectWalletModal
          {...props}
          wallets={wallets}
          onConnect={({ wallet, account, connector }) => {
            setUserWallet({ ...wallet, account, connector });
          }}
        />
      </Suspense>
    ));
    setIsModalOpen(false);
  }, [modal, wallets, setUserWallet]);

  const closeModal = useCallback(() => {
    modal.close();
    setIsModalOpen(false);
  }, [modal]);

  const connectModalButtonProps = useMemo(() => {
    const label = isModalOpen ? 'Close' : 'Connect';
    const onClick = isModalOpen ? closeModal : openConnectModal;

    const color: ButtonColor = isModalOpen ? 'primary_inverted' : 'primary';
    const iconType: IconType = isModalOpen ? 'close' : 'login';
    const labelHidden = isModalOpen;

    return {
      color,
      iconType,
      label,
      onClick,
      labelHidden,
    };
  }, [isModalOpen, closeModal, openConnectModal]);

  const openAccountModal = useCallback(async () => {
    const address = userWallet?.account.address;
    if (!address) return;

    setIsModalOpen(true);
    await modal.open((props) => (
      <Suspense>
        <AccountModal
          {...props}
          wallet={userWallet}
          onDisconnect={() => {
            userWallet?.connector?.disconnect();
            setUserWallet(null);
            props.onClose();
          }}
        />
      </Suspense>
    ));
    setIsModalOpen(false);
  }, [userWallet, modal]);

  const accountModalButtonProps = useMemo(() => {
    if (!userWallet) return undefined;

    const label = shortenAddress(userWallet.account.address);
    const onClick = isModalOpen ? closeModal : openAccountModal;

    const color: ButtonColor = isModalOpen ? 'primary_inverted' : 'primary';
    const iconType: IconType = isModalOpen ? 'close' : 'menu';
    const labelHidden = isModalOpen;

    return {
      color,
      iconType,
      label,
      onClick,
      labelHidden,
    };
  }, [isModalOpen, closeModal, openAccountModal, userWallet]);

  return (
    <header className={`flex items-center justify-between px-8 py-9 ${className}`}>
      <AppLogo size="lg" color="dark" />

      {accountModalButtonProps ? (
        <Button size="md" {...accountModalButtonProps} />
      ) : (
        <Button size="md" {...connectModalButtonProps} />
      )}
    </header>
  );
};

export default AppHeader;
