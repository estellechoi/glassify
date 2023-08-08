import useBalance from '@/hooks/useBalance';
import { ConnectedWallet } from '@/types/wallet';
import Table from '../Table';
import { useMemo } from 'react';
import Coin from '../Coin';
import { formatUSD } from '@/utils/number';

type BalanceTokensTableRow = {
  id: string;
  token: JSX.Element;
  vol24H: number;
  vol24HCompact: string;
  price: number;
  priceCompact: string;
};

type BalanceTokensTableProps = {
  wallet: ConnectedWallet;
};

const BalanceTokensTable = ({ wallet }: BalanceTokensTableProps) => {
  const { balance, isLoading } = useBalance(wallet);

  const tableRows = useMemo<readonly BalanceTokensTableRow[]>(() => {
    return balance.marketValues.map((marketValue) => {
      const id = marketValue.symbol;
      const token = (
        <span className="flex items-center gap-x-2">
          <Coin symbol={marketValue.symbol} />
          <span>{marketValue.symbol}</span>
        </span>
      );

      const vol24H = marketValue.vol24H ?? 0;
      const vol24HCompact = formatUSD(marketValue.vol24H, { compact: true });

      const price = marketValue.price.USD ?? 0;
      const priceCompact = formatUSD(marketValue.price.USD, { fixDp: true });

      return {
        id,
        token,
        vol24H,
        vol24HCompact,
        price,
        priceCompact,
      };
    });
  }, [balance]);

  return (
    <Table<BalanceTokensTableRow>
      dSortValue="price"
      rows={tableRows}
      fields={[
        {
          label: 'Token',
          value: 'token',
          type: 'jsx',
        },
        {
          label: 'Price',
          value: 'priceCompact',
          type: 'number',
          align: 'right',
          sortValue: 'price',
          sortType: 'number',
          widthRatio: 0,
        },
        {
          label: 'Volume 24H',
          value: 'vol24HCompact',
          type: 'number',
          align: 'right',
          sortValue: 'vol24H',
          sortType: 'number',
          widthRatio: 20,
        },
      ]}
    >
      <Table.FieldRow />
    </Table>
  );
};

export default BalanceTokensTable;
