import Table from '@/components/Table';
import type { GainersLosersTableRow } from './useGainersLosersTableRowsGetter';

type GainersLosersTableProps = {
  rows: readonly GainersLosersTableRow[];
  isLoading: boolean;
};

const GainersLosersTable = ({ rows, isLoading }: GainersLosersTableProps) => {
  return (
    <Table<GainersLosersTableRow>
      tooltipContext="base"
      dSortValue="priceChange24h"
      rows={rows}
      fields={[
        {
          label: 'Token',
          value: 'token',
          type: 'jsx',
          widthRatio: 30,
          loaderType: 'coin_label',
        },
        {
          label: 'Chain',
          value: 'chain',
          type: 'jsx',
          widthPx: 200,
          loaderType: 'coin_label',
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
          label: 'Change 24H',
          value: 'priceChange24hFormatted',
          type: 'jsx',
          align: 'right',
          sortValue: 'priceChange24h',
          sortType: 'number',
          widthRatio: 32,
        },
      ]}
      isLoading={isLoading}
    >
      <Table.FieldRow />
    </Table>
  );
};

export default GainersLosersTable;
