import { useEffect, useMemo } from 'react';
import { ConnectedWallet } from '@/types/wallet';
import useBalance from '@/hooks/useBalance';
import { formatUSD } from '@/utils/number';
import Table from '@/components/Table';
import useUserAgent from '@/hooks/useUserAgent';
import UpDownNumberText from '@/components/UpDownNumberText';
import type { TableField } from '@/components/Table/types';
import CoinLabel from '@/components/CoinLabel';
import type { TooltipContext } from '@/components/Tooltip/styles';

type BalanceTokensTableRow = {
  id: string;
  token: JSX.Element;
  marketCap: number;
  marketCapFormatted: string;
  price: number;
  priceFormatted: string;
  priceChange: number;
  priceChangeFormatted: JSX.Element;
  vol24H: number;
  vol24HFormatted: string;
  vol24HChange: number;
  vol24HChangeFormatted: JSX.Element;
};

type BalanceTokensTableProps = {
  wallet: ConnectedWallet;
  onLoaded?: () => void;
  tooltipContext: TooltipContext;
};

const BalanceTokensTable = ({ wallet, onLoaded, tooltipContext }: BalanceTokensTableProps) => {
  const { balance, isLoading } = useBalance(wallet);

  useEffect(() => {
    if (isLoading) onLoaded?.();
  }, [isLoading]);

  const rows = useMemo<readonly BalanceTokensTableRow[]>(() => {
    return balance.marketValues.map((marketValue) => {
      const id = marketValue.symbol;
      const token = <CoinLabel size="md" symbol={marketValue.symbol} />;

      const marketCap = marketValue.marketCap ?? 0;
      const marketCapFormatted = formatUSD(marketValue.marketCap, { compact: true });

      const price = marketValue.price.USD ?? 0;
      const priceFormatted = formatUSD(marketValue.price.USD, { fixDp: true });

      const priceChange = marketValue.priceChange24H ?? -1000000;
      const priceChangeFormatted = <UpDownNumberText number={priceChange} unit="%" />;

      const vol24H = marketValue.vol24H ?? 0;
      const vol24HFormatted = formatUSD(marketValue.vol24H, { compact: true });

      const vol24HChange = marketValue.vol24HChangePercentage ?? -1000000;
      const vol24HChangeFormatted = <UpDownNumberText number={vol24HChange} unit="%" />;

      return {
        id,
        token,
        marketCap,
        marketCapFormatted,
        price,
        priceFormatted,
        priceChange,
        priceChangeFormatted,
        vol24H,
        vol24HFormatted,
        vol24HChange,
        vol24HChangeFormatted,
      };
    });
  }, [balance.marketValues]);

  const { isMobile } = useUserAgent();

  const fields = useMemo<readonly TableField<BalanceTokensTableRow>[]>(() => {
    const expandedFields: TableField<BalanceTokensTableRow>[] = isMobile
      ? []
      : [
          {
            label: 'Market cap',
            value: 'marketCapFormatted',
            type: 'number',
            sortValue: 'marketCap',
            sortType: 'number',
            align: 'right',
            widthRatio: 20,
          },
          {
            label: 'Volume 24H',
            value: 'vol24HFormatted',
            type: 'number',
            align: 'right',
            sortValue: 'vol24H',
            sortType: 'number',
            widthRatio: 20,
          },
          {
            label: 'Change',
            value: 'vol24HChangeFormatted',
            type: 'jsx',
            align: 'right',
            sortValue: 'vol24HChange',
            sortType: 'number',
            widthPx: 100,
          },
        ];

    return [
      {
        label: 'Token',
        value: 'token',
        type: 'jsx',
        widthRatio: 20,
      },
      {
        label: 'Price',
        value: 'priceFormatted',
        type: 'number',
        sortValue: 'price',
        sortType: 'number',
        align: 'right',
      },
      {
        label: 'Change',
        value: 'priceChangeFormatted',
        type: 'jsx',
        align: 'right',
        sortValue: 'priceChange',
        sortType: 'number',
        widthPx: 100,
      },
      ...expandedFields,
    ];
  }, [isMobile]);

  return (
    <Table<BalanceTokensTableRow> dSortValue="priceChange" tooltipContext={tooltipContext} rows={rows} fields={fields}>
      <Table.FieldRow />
    </Table>
  );
};

export default BalanceTokensTable;
