import { useEffect, useMemo } from 'react';
import { ConnectedWallet } from '@/types/wallet';
import useBalance from '@/hooks/useBalance';
import { formatNumber, formatUSD } from '@/utils/number';
import Table from '@/components/Table';
import Coin from '@/components/Coin';
import Card from '@/components/Card';
import Icon from '../Icon';
import useUserAgent from '@/hooks/useUserAgent';
import { TableField } from '../Table/types';
import UpDownNumberText from '../UpDownNumberText';

type BalanceTokensTableRow = {
  id: string;
  token: JSX.Element;
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
};

const BalanceTokensTable = ({ wallet, onLoaded }: BalanceTokensTableProps) => {
  const { balance, isLoading } = useBalance(wallet);

  useEffect(() => {
    if (isLoading) onLoaded?.();
  }, [isLoading]);

  const rows = useMemo<readonly BalanceTokensTableRow[]>(() => {
    return balance.marketValues.map((marketValue) => {
      const id = marketValue.symbol;
      const token = (
        <span className="flex items-center gap-x-2">
          <Coin symbol={marketValue.symbol} />
          <span>{marketValue.symbol}</span>
        </span>
      );

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
  }, [balance]);

  const { isMobile } = useUserAgent();

  const fields = useMemo<readonly TableField<BalanceTokensTableRow>[]>(() => {
    const nonMobileOnlyFields: readonly TableField<BalanceTokensTableRow>[] = isMobile
      ? []
      : [
          {
            label: 'Volume 24H',
            value: 'vol24HFormatted',
            type: 'number',
            align: 'right',
            sortValue: 'vol24H',
            sortType: 'number',
            widthRatio: 25,
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
      ...nonMobileOnlyFields,
    ];
  }, [isMobile]);

  return (
    <Card>
      <Table<BalanceTokensTableRow> dSortValue="priceChange" rows={rows} fields={fields} isLoading={isLoading}>
        <Table.FieldRow />
      </Table>
    </Card>
  );
};

export default BalanceTokensTable;
