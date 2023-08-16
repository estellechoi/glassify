import Button from '@/components/Button';
import useAccountOrConnectButton from './useAccountOrConnectButton';

const AccountButton = () => {
  const { buttonProps, modal } = useAccountOrConnectButton();

  return (
    <Button
      size="md"
      className="min-w-[11.875rem] animate-fade_out_x"
      aria-expanded={modal.isOpen}
      aria-controls={modal.id}
      {...buttonProps}
    />
  );
};

export default AccountButton;
