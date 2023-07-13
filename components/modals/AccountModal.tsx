import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '../Button';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  address: string;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { address, onDisconnect } = props;

  return (
    <AnimatedModal {...props} ariaLabel="Connected wallet account">
      <div className="grid grid-cols-2 items-center px-10 py-32">
        <span className="Font_data_16px_num text-white">{address}</span>

        <Button iconType="disconnect" label="Disconnect" size="sm" onClick={onDisconnect} />
      </div>
    </AnimatedModal>
  );
};

export default AccountModal;
