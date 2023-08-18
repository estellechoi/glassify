import { useCallback } from 'react';
import { EventCategory } from '@/analytics/constants';
import useAnalytics from '@/hooks/useAnalytics';
import useProcessing from '@/hooks/useProcessing';
import type { Wallet } from '@/types/wallet';
import type { Connector, EthAccount } from '@/connectors/types';

const useConnect = () => {
  const { sendEvent, identify } = useAnalytics();
  const { target: connectingWallet, startProcessing: startConnecting, stopProcessing: stopConnecting } = useProcessing<Wallet>();

  const connect = useCallback(
    async (wallet: Wallet): Promise<{ wallet: Wallet; account: EthAccount; connector: Connector } | undefined> => {
      sendEvent(EventCategory.TRY_CONNECT_WALLET, `Try Connecting Wallet: ${wallet.name}`);

      const connector = await wallet.getConnector();

      if (!connector) {
        wallet.onNoConnector();
        sendEvent(EventCategory.FAIL_CONNECT_WALLET, `Fail to Connect Wallet - Uninstalled: ${wallet.name}`);
        return;
      }

      startConnecting(wallet);

      const account = await connector.connect();
      if (!account) {
        sendEvent(EventCategory.FAIL_CONNECT_WALLET, `Fail to Connect Wallet - No Account: ${wallet.name}`);
        stopConnecting();
        return;
      }

      stopConnecting();

      identify(account.address);

      return { wallet, account, connector };
    },
    [startConnecting, stopConnecting, sendEvent, identify]
  );

  return { connect, connectingWallet };
};

export default useConnect;
