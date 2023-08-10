import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { userWalletAtom } from '@/store/states';
import { shortenAddress } from '@/utils/text';
import useWallets from '@/connection/useWallets';
import useAutoConnect from '@/connection/useAutoConnect';
import type { IconType } from '@/components/Icon';
import type { ButtonColor, ButtonStatus } from '../Button/types';

const SelectWalletModal = lazy(() => import('@/components/modals/SelectWalletModal'));
const AccountModal = lazy(() => import('@/components/modals/AccountModal'));

const AccountButton = () => {
  const [userWallet, setUserWallet] = useAtom(userWalletAtom);

  const wallets = useWallets();
  const { isConnecting } = useAutoConnect(wallets);

  const accountModal = useModal();
  const connectModal = useModal();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openAccountModal = useCallback(async () => {
    const address = userWallet?.account.address;
    if (!address) return;

    setIsModalOpen(true);
    await accountModal.open((props) => (
      <Suspense>
        <AccountModal
          {...props}
          id={accountModal.id}
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
  }, [userWallet, accountModal]);

  const openConnectModal = useCallback(async () => {
    setIsModalOpen(true);
    await connectModal.open((props) => (
      <Suspense>
        <SelectWalletModal
          {...props}
          id={connectModal.id}
          wallets={wallets}
          onConnect={({ wallet, account, connector }) => {
            setUserWallet({ ...wallet, account, connector });
          }}
        />
      </Suspense>
    ));
    setIsModalOpen(false);
  }, [connectModal, wallets, setUserWallet]);

  const accountModalButtonProps = useMemo(() => {
    if (!userWallet) return undefined;

    const label = shortenAddress(userWallet.account.address, 2, 4);
    const onClick = openAccountModal;
    const color: ButtonColor = 'primary';
    const iconType: IconType = 'menu';

    return {
      color,
      iconType,
      label,
      onClick,
    };
  }, [openAccountModal, userWallet]);

  const connectModalButtonProps = useMemo(() => {
    const label = 'Connect';
    const onClick = openConnectModal;
    const status: ButtonStatus = isConnecting || connectModal.isOpen ? 'processing' : 'enabled';
    const color: ButtonColor = 'primary';
    const iconType: IconType = 'login';

    return {
      status,
      color,
      iconType,
      label,
      onClick,
    };
  }, [openConnectModal, isConnecting, connectModal.isOpen]);

  const buttonProps = accountModalButtonProps ?? connectModalButtonProps;
  const modal = userWallet ? accountModal : connectModal;

  return (
    <Button
      size="md"
      className="min-w-[11.875rem] animate-fade_in_x_reverse"
      aria-expanded={modal.isOpen}
      aria-controls={modal.id}
      {...buttonProps}
    />
  );
};

export default AccountButton;
