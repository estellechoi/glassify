import Table from '@/components/Table';
import type { GainersLosersTableRow } from './useGainersLosersTableRowsGetter';
import type { TooltipLayer } from '@/components/Tooltip/styles';
import useUserAgent from '@/hooks/useUserAgent';
import { useMemo } from 'react';
import { TableField } from '@/components/Table/types';

type GainersLosersTableProps = {
  rows: readonly GainersLosersTableRow[];
  isLoading: boolean;
  tooltipContext: TooltipLayer;
};

const GainersLosersTable = ({ rows, isLoading, tooltipContext }: GainersLosersTableProps) => {
  const { isMobile } = useUserAgent();

  const fields = useMemo<readonly TableField<GainersLosersTableRow>[]>(() => {
    const expandedFields: TableField<GainersLosersTableRow>[] = isMobile
      ? []
      : [
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
        ];

    return [
      {
        label: 'Token',
        value: 'token',
        type: 'jsx',
        widthRatio: 30,
        loaderType: 'coin_label',
      },
      ...expandedFields,
      {
        label: isMobile ? 'Price' : 'Change 24H',
        value: 'priceChange24hResponsive',
        type: 'jsx',
        align: 'right',
        sortValue: 'priceChange24h',
        sortType: 'number',
        widthRatio: 32,
      },
    ];
  }, [isMobile]);

  return (
    <Table<GainersLosersTableRow>
      tooltipContext={tooltipContext}
      dSortValue="priceChange24h"
      rows={rows}
      fields={fields}
      isLoading={isLoading}
    >
      <Table.FieldRow />
    </Table>
  );
};

export default GainersLosersTable;
