import { useCallback } from 'react';
import AnimatedModal, { type AnimatedModalProps } from '@/components/AnimatedModal';
import OptionGrid from '@/components/OptionGrid';
import type { Wallet } from '@/types/wallet';

type SelectWalletModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallets: readonly Wallet[];
  onConnect: (wallet: Wallet | null) => void;
};

const SelectWalletModal = (props: SelectWalletModalProps) => {
  const { wallets, onConnect, onClose } = props;

  const onClickConnect = useCallback(
    async (wallet: Wallet) => {
      const connected = (await wallet.connector?.connect()) ?? wallet.onNoConnector();

      onConnect(connected ? wallet : null);
      if (connected) onClose();
    },
    [onConnect, onClose]
  );

  return (
    <AnimatedModal {...props} ariaLabel="Select wallet">
      <OptionGrid className="h-full py-32">
        {wallets.map((wallet) => (
          <OptionGrid.Option
            key={wallet.name}
            type="button"
            label={wallet.name}
            imgUrl={wallet.logoUrl}
            onClick={() => onClickConnect(wallet)}
          ></OptionGrid.Option>
        ))}
      </OptionGrid>
    </AnimatedModal>
  );
};

export default SelectWalletModal;
