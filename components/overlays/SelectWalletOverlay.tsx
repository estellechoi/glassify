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
import useAnalytics from '@/hooks/useAnalytics';
import { EventCategory } from '@/analytics/constants';
import useConnect from '@/connection/useConnect';

export type OnConnect = (args: { wallet: Wallet; account: EthAccount; connector: Connector }) => void;

type SelectWalletOverlayProps = Omit<AnimatedModalProps, 'ariaLabel'> & {
  wallets: readonly Wallet[];
  onConnect: OnConnect;
};

const SelectWalletOverlay = (props: SelectWalletOverlayProps) => {
  const { wallets, onConnect, onClose, isOpen } = props;

  const { connect, connectingWallet } = useConnect();

  const onClickConnect = useCallback(
    async (wallet: Wallet) => {
      const connectedData = await connect(wallet);
      if (!connectedData) return;

      onConnect(connectedData);
      onClose();
    },
    [connect, onConnect, onClose]
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
    <BottomSheet {...props} isOpen={isOpen} ariaLabel={ARIA_LABEL}>
      <BottomSheet.Content className="Padding_modal">{Content}</BottomSheet.Content>
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
