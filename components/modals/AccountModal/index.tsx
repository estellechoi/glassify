import AnimatedModal from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import type { ConnectedWallet } from '@/types/wallet';
import NFTs from './NFTs';
import Tokens from './Tokens';
import { useMemo } from 'react';
import { formatUSD } from '@/utils/number';
import NumberText from '@/components/NumberText';
import useBalance from '@/hooks/useBalance';
import useOwnedNFTs from '@/hooks/useOwnedNFTs';
import type { AnimatedModalProps } from '@/components/AnimatedModal/Container';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallet: ConnectedWallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { wallet, onDisconnect, isOpen } = props;

  const { balance, isLoading: isBalanceLoading } = useBalance(wallet);
  const { ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(wallet);

  const formattedTotalUSD = useMemo(() => formatUSD(balance.totalValueUSD), [balance]);

  return (
    <AnimatedModal ariaLabel="Connected wallet account" className="h-[80vh] Padding_modal" {...props}>
      <AnimatedModal.Content isOpen={isOpen} className="space-y-3 pb-[5rem] overflow-auto scroll-smooth">
        <AccountAddress wallet={wallet} />

        <NumberText size="xl" type="small_fractions" formattedNumber={formattedTotalUSD} />

        <NFTs ownedNFTs={ownedNFTs} isOwnedNFTsLoading={isOwnedNFTsLoading} />

        <Tokens balances={balance.balances} isBalanceLoading={isBalanceLoading} />
      </AnimatedModal.Content>

      <AnimatedModal.BottomBar className="Padding_modal">
        <Button
          iconType="disconnect"
          label="Disconnect"
          type="outline"
          color="primary_inverted"
          size="sm"
          onClick={onDisconnect}
        />
      </AnimatedModal.BottomBar>
    </AnimatedModal>
  );
};

export default AccountModal;
