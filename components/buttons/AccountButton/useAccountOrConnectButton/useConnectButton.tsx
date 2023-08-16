import { Suspense, lazy, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { userWalletAtom } from '@/store/states';
import useModal from '@/hooks/useModal';
import useWallets from '@/connection/useWallets';
import useAutoConnect from '@/connection/useAutoConnect';
import type { IconType } from '@/components/Icon';
import type { OnConnect } from '@/components/overlays/SelectWalletOverlay';
import type { ButtonColor, ButtonStatus } from '@/components/Button/types';
import type { ButtonProps } from '@/components/Button';

const SelectWalletOverlay = lazy(() => import('@/components/overlays/SelectWalletOverlay'));

const useConnectButton = (): {
  connectModalButtonProps: Pick<ButtonProps, 'status' | 'color' | 'iconType' | 'label' | 'onClick'>;
  connectModal: ReturnType<typeof useModal>;
} => {
  const wallets = useWallets();

  const [, setUserWallet] = useAtom(userWalletAtom);

  const { isConnecting } = useAutoConnect(wallets);

  const connectModal = useModal();

  const onConnect: OnConnect = useCallback(
    ({ wallet, account, connector }) => {
      setUserWallet({ ...wallet, account, connector });
    },
    [setUserWallet]
  );

  const openConnectModal = useCallback(async () => {
    await connectModal.open((props) => (
      <Suspense>
        <SelectWalletOverlay {...props} id={connectModal.id} wallets={wallets} onConnect={onConnect} />
      </Suspense>
    ));
  }, [connectModal, wallets, onConnect]);

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

  return {
    connectModalButtonProps,
    connectModal,
  };
};

export default useConnectButton;
