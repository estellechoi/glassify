import AccountAddress from '@/components/AccountAddress';
import type { OverlayProps } from '@/components/types';
import useBalance from '@/hooks/useBalance';
import useOwnedNFTs from '@/hooks/useOwnedNFTs';
import type { ConnectedWallet } from '@/types/wallet';
import { formatUSD } from '@/utils/number';
import { useMemo } from 'react';
import BalanceTotal from './BalanceTotal';
import NFTs from './NFTs';
import Tokens from './Tokens';
import Button from '@/components/Button';

export type AccountOverlayProps = Omit<OverlayProps, 'ariaLabel'> & {
  wallet: ConnectedWallet;
  onWillDisconnect?: () => void | Promise<void>;
};

const useAccountOverlayElements = (props: AccountOverlayProps) => {
  const { wallet, onWillDisconnect } = props;

  const { balance, isLoading: isBalanceLoading } = useBalance(wallet);
  const { ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(wallet);

  const formattedTotalUSD = useMemo(() => formatUSD(balance.totalValueUSD), [balance]);

  const Content = (
    <div className="space-y-3 pb-[5rem] overflow-auto scroll-smooth">
      <AccountAddress wallet={wallet} />
      <BalanceTotal formattedNumber={formattedTotalUSD} isLoading={isBalanceLoading} />
      <NFTs ownedNFTs={ownedNFTs} isOwnedNFTsLoading={isOwnedNFTsLoading} />
      <Tokens balances={balance.balances} isBalanceLoading={isBalanceLoading} />
    </div>
  );

  const DisconnectButton = (
    <Button
      iconType="disconnect"
      label="Disconnect"
      type="outline"
      color="primary_inverted"
      size="sm"
      onClick={onWillDisconnect}
    />
  );

  return { Content, DisconnectButton };
};

export default useAccountOverlayElements;
