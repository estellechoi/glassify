import { Suspense, lazy, useCallback, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import useModal from '@/hooks/useModal';
import { userWalletAtom } from '@/store/states';
import { shortenAddress } from '@/utils/text';
import type { IconType } from '@/components/Icon';
import type { ButtonColor } from '../../../Button/types';
import type { ModalElement } from '@/hooks/useModal/types';
import { ButtonProps } from '@/components/Button';
import useAnalytics from '@/hooks/useAnalytics';
import { EventCategory } from '@/analytics/constants';

const AccountOverlay = lazy(() => import('@/components/overlays/AccountOverlay'));

const useAccountButton = (): {
  accountModalButtonProps: Pick<ButtonProps, 'color' | 'iconType' | 'label' | 'onClick'> | undefined;
  accountModal: ReturnType<typeof useModal> | undefined;
} => {
  const [userWallet, setUserWallet] = useAtom(userWalletAtom);

  const accountModal = useModal();

  const onWillDisconnect = useCallback(
    async (props: Parameters<ModalElement>[0]) => {
      await userWallet?.connector?.disconnect();
      setUserWallet(null);
      props.onClose();
    },
    [userWallet, setUserWallet]
  );

  const openAccountModal = useCallback(async () => {
    const address = userWallet?.account.address;
    if (!address) return;

    await accountModal.open((props) => (
      <Suspense>
        <AccountOverlay {...props} id={accountModal.id} wallet={userWallet} onWillDisconnect={() => onWillDisconnect(props)} />
      </Suspense>
    ));
  }, [userWallet, accountModal, onWillDisconnect]);

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

  // report
  const { sendEvent } = useAnalytics();

  useEffect(() => {
    if (!userWallet) sendEvent(EventCategory.WALLET_CONNECTION, 'disconnect');
  }, [userWallet]);

  return {
    accountModalButtonProps,
    accountModal: userWallet ? accountModal : undefined,
  };
};

export default useAccountButton;
