import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import { useBalanceQuery } from '@/data/hooks';
import { formatNumber } from '@/utils/number';
import NumberText from '@/components/NumberText';
import type { Wallet } from '@/types/wallet';
import type { EthAddress } from '@/connectors/types';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  address: EthAddress;
  wallet: Wallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { address, wallet, onDisconnect } = props;

  const { data: balance } = useBalanceQuery({ address, chainId: wallet.connector?.chainId ?? 1 });

  return (
    <AnimatedModal ariaLabel="Connected wallet account" {...props}>
      <div className="h-full flex flex-col items-start justify-between Padding_modal">
        <div>
          <AccountAddress address={address} wallet={wallet} />
          <NumberText formattedNumber={formatNumber(balance?.value, balance?.decimals)} unit={balance?.symbol} />
        </div>

        <Button iconType="disconnect" label="Disconnect" size="sm" onClick={onDisconnect} />
      </div>
    </AnimatedModal>
  );
};

export default AccountModal;
