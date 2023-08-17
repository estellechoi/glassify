import Button from '@/components/Button';
import useAccountOrConnectButton from './useAccountOrConnectButton';

const AccountButton = () => {
  const { buttonProps, modal } = useAccountOrConnectButton();

  return (
    <div className="animate-fade_out_x">
      <Button size="md" className="min-w-[11.875rem]" aria-expanded={modal.isOpen} aria-controls={modal.id} {...buttonProps} />
    </div>
  );
};

export default AccountButton;
