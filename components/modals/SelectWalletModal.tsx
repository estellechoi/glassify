import { useCallback } from 'react';
import AnimatedModal from '@/components/AnimatedModal';
import OptionGrid from '@/components/OptionGrid';
import type { Wallet } from '@/types/wallet';
import { Connector, EthAccount } from '@/connectors/types';
import OptionItem from '../OptionItem';
import type { AnimatedModalProps } from '@/components/AnimatedModal/Container';
import useProcessing from '@/hooks/useProcessing';

type SelectWalletModalProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallets: readonly Wallet[];
  onConnect: ({ wallet, account, connector }: { wallet: Wallet; account: EthAccount; connector: Connector }) => void;
};

const SelectWalletModal = (props: SelectWalletModalProps) => {
  const { wallets, onConnect, onClose, isOpen } = props;

  const { target: connectingWallet, startProcessing: startConnecting, stopProcessing: stopConnecting } = useProcessing<Wallet>();

  const onClickConnect = useCallback(
    async (wallet: Wallet) => {
      if (!wallet.connector) {
        wallet.onNoConnector();
        return;
      }

      startConnecting(wallet);

      const account = await wallet.connector.connect();
      if (!account) {
        stopConnecting();
        return;
      }

      onConnect({ wallet, account, connector: wallet.connector });

      stopConnecting();

      onClose();
    },
    [onConnect, onClose, startConnecting, stopConnecting]
  );

  return (
    <AnimatedModal {...props} ariaLabel="Select wallet">
      <AnimatedModal.Content isOpen={isOpen} className="Padding_modal">
        <OptionGrid>
          {wallets.map((wallet) => (
            <OptionGrid.Option key={wallet.name}>
              <OptionItem
                imgURL={wallet.logoURL}
                label={wallet.name}
                onClick={() => onClickConnect(wallet)}
                isProcessing={connectingWallet?.type === wallet.type}
              />
            </OptionGrid.Option>
          ))}
        </OptionGrid>
      </AnimatedModal.Content>
    </AnimatedModal>
  );
};

export default SelectWalletModal;
