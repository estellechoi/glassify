import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import Button from '@/components/Button';
import AccountAddress from '@/components/AccountAddress';
import { useBalancesQuery, useEthBalanceQuery } from '@/data/hooks';
import { formatNumber } from '@/utils/number';
import NumberText from '@/components/NumberText';
import type { ConnectedWallet } from '@/types/wallet';
import Coin from '../Coin';
import LoadingRows from '../LoadingRows';

type AccountModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallet: ConnectedWallet;
  onDisconnect?: () => void;
};

const AccountModal = (props: AccountModalProps) => {
  const { wallet, onDisconnect } = props;

  const { data: ethBalance } = useEthBalanceQuery({ wallet });
  const { data: balances, isLoading } = useBalancesQuery({ wallet });

  return (
    <AnimatedModal ariaLabel="Connected wallet account" {...props} className="h-[50vh]">
      <div className="h-full flex flex-col items-start justify-between Padding_modal">
        <div className="space-y-3">
          <AccountAddress wallet={wallet} />

          <div className="flex flex-col gap-y-2">
            <span className="flex items-center gap-x-2">
              <Coin />
              <NumberText formattedNumber={formatNumber(ethBalance?.value, ethBalance?.decimals)} unit={ethBalance?.symbol} />
            </span>

            {isLoading ? (
              <LoadingRows rowsCnt={3} fontClassName="Font_data_20px_num" />
            ) : (
              (balances ?? []).map((balance) => (
                <span key={balance.symbol} className="flex items-center gap-x-2">
                  <Coin symbol={balance.symbol} />
                  <NumberText formattedNumber={formatNumber(balance?.value, balance?.decimals)} unit={balance?.symbol} />
                </span>
              ))
            )}
          </div>
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
