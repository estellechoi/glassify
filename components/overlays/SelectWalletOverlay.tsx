import { useCallback } from 'react';
import AnimatedModal from '@/components/AnimatedModal';
import OptionGrid from '@/components/OptionGrid';
import type { Wallet } from '@/types/wallet';
import { Connector, EthAccount } from '@/connectors/types';
import OptionItem from '../OptionItem';
import type { AnimatedModalProps } from '@/components/AnimatedModal/Container';
import useProcessing from '@/hooks/useProcessing';
import useUserAgent from '@/hooks/useUserAgent';
import BottomSheet from '../BottomSheet';

export type OnConnect = (args: { wallet: Wallet; account: EthAccount; connector: Connector }) => void;

type SelectWalletOverlayProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallets: readonly Wallet[];
  onConnect: OnConnect;
};

const SelectWalletOverlay = (props: SelectWalletOverlayProps) => {
  const { wallets, onConnect, onClose, isOpen } = props;

  const { target: connectingWallet, startProcessing: startConnecting, stopProcessing: stopConnecting } = useProcessing<Wallet>();

  const onClickConnect = useCallback(
    async (wallet: Wallet) => {
      const connector = await wallet.getConnector();

      if (!connector) {
        wallet.onNoConnector();
        return;
      }

      startConnecting(wallet);

      const account = await connector.connect();
      if (!account) {
        stopConnecting();
        return;
      }

      stopConnecting();

      onConnect({ wallet, account, connector });
      onClose();
    },
    [onConnect, onClose, startConnecting, stopConnecting]
  );

  const Content = (
    <OptionGrid>
      {wallets.map((wallet) => (
        <OptionGrid.Option key={wallet.name}>
          <OptionItem
            imgURL={wallet.logoURL}
            label={wallet.name}
            trailingTag={wallet.isComing ? { size: 'sm', label: 'Soon' } : undefined}
            disabled={wallet.isComing}
            onClick={() => onClickConnect(wallet)}
            isProcessing={connectingWallet?.type === wallet.type}
          />
        </OptionGrid.Option>
      ))}
    </OptionGrid>
  );

  const ARIA_LABEL = 'Select wallet';

  const { isMobile } = useUserAgent();

  return isMobile ? (
    <BottomSheet {...props} isOpen={isOpen} ariaLabel={ARIA_LABEL} className="Padding_modal">
      {Content}
    </BottomSheet>
  ) : (
    <AnimatedModal {...props} ariaLabel={ARIA_LABEL}>
      <AnimatedModal.Content isOpen={isOpen} className="Padding_modal">
        {Content}
      </AnimatedModal.Content>
    </AnimatedModal>
  );
};

export default SelectWalletOverlay;
