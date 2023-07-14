import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import type { Wallet } from '@/types/wallet';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  address: string;
  wallet: Wallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { address, wallet, onDisconnect } = props;

  return (
    <AnimatedModal {...props} ariaLabel="Connected wallet account">
      <div className="h-full flex flex-col items-start justify-between Padding_modal">
        <AccountAddress address={address} wallet={wallet} />

        <Button iconType="disconnect" label="Disconnect" size="sm" onClick={onDisconnect} />
      </div>
    </AnimatedModal>
  );
};

export default AccountModal;
