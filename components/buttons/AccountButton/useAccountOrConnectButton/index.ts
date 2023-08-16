import useConnectButton from './useConnectButton';
import useAccountButton from './useAccountButton';

const useAccountOrConnectButton = () => {
  const { accountModalButtonProps, accountModal } = useAccountButton();
  const { connectModalButtonProps, connectModal } = useConnectButton();

  const buttonProps = accountModalButtonProps ?? connectModalButtonProps;
  const modal = accountModal ?? connectModal;

  return {
    buttonProps,
    modal,
  };
};

export default useAccountOrConnectButton;
