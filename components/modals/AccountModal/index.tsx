import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import type { ConnectedWallet } from '@/types/wallet';
import NFTs from './NFTs';
import Tokens from './Tokens';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallet: ConnectedWallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { wallet, onDisconnect } = props;

  return (
    <AnimatedModal ariaLabel="Connected wallet account" className="h-[80vh] Padding_modal" {...props}>
      <div className="h-full flex flex-col items-stretch justify-between">
        <div className="space-y-3">
          <AccountAddress wallet={wallet} />
          <NFTs wallet={wallet} />
          <Tokens wallet={wallet} />
        </div>

        <Button
          iconType="disconnect"
          label="Disconnect"
          type="outline"
          color="primary_inverted"
          size="sm"
          onClick={onDisconnect}
        />
      </div>
    </AnimatedModal>
  );
};

export default AccountModal;
