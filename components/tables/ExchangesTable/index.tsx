import { useMemo } from 'react';
import Table from '@/components/Table';
import { useCMCExchangesMetadataQuery, useCMCExchangesQuery } from '@/data/hooks';
import Heading from '@/components/Heading';
import useUserAgent from '@/hooks/useUserAgent';
import Card from '@/components/Card';
import CoinLabel from '@/components/CoinLabel';
import { formatNumber, formatUSD } from '@/utils/number';
import A from '@/components/A';
import Icon from '@/components/Icon';

type ExchangesTableRow = {
  id: string;
  exchange: JSX.Element;
  exchangeName: string;
  fee: number;
  feeFormatted: string | JSX.Element;
  vol24H: number;
  vol24HFormatted: string | JSX.Element;
};

type ExchangesTableProps = {
  className?: string;
};

const ExchangesTable = ({ className = '' }: ExchangesTableProps) => {
  const { data: exchangesData, isLoading: isExchangesDataLoading } = useCMCExchangesQuery({ limit: 5 });

  const ids = useMemo<readonly number[]>(() => {
    return exchangesData?.map((item) => item.id) ?? [];
  }, [exchangesData]);

  const { data: exchangesMetadata, isLoading: isExchangesMetadataLoading } = useCMCExchangesMetadataQuery(ids);

  const rows = useMemo<readonly ExchangesTableRow[]>(() => {
    return (
      exchangesData?.map((item) => {
        const metadata = exchangesMetadata?.[item.id];

        const id = String(item.id);
        const exchange = (
          <A href={metadata?.urls.website[0]} className="flex items-center gap-x-1">
            <CoinLabel size="lg" symbol={item.name} logoURL={metadata?.logo} />
            <Icon type="external_link" size="md" className="text-caption_dark" />
          </A>
        );
        const exchangeName = item.name;

        const fee = metadata?.maker_fee ?? 0;
        const feeFormatted = `${formatNumber(fee, 3)}%`;

        const vol24H = metadata?.spot_volume_usd ?? 0;
        const vol24HFormatted = formatUSD(vol24H, { compact: true });

        return {
          id,
          exchange,
          exchangeName,
          fee,
          feeFormatted,
          vol24H,
          vol24HFormatted,
        };
      }) ?? []
    );
  }, [exchangesData, exchangesMetadata]);

  const Content = useMemo<JSX.Element>(() => {
    return (
      <Table<ExchangesTableRow>
        tooltipContext="base"
        dSortValue="vol24H"
        rows={rows}
        fields={[
          {
            label: 'Exchange',
            value: 'exchange',
            type: 'jsx',
            sortValue: 'exchangeName',
            sortType: 'string',
            widthRatio: 30,
            loaderType: 'coin_label',
          },
          {
            label: 'Trading Fee',
            value: 'feeFormatted',
            type: 'number',
            align: 'right',
            sortValue: 'fee',
            sortType: 'number',
            widthRatio: 20,
          },
          {
            label: 'Spot Volume',
            value: 'vol24HFormatted',
            type: 'number',
            align: 'right',
            sortValue: 'vol24H',
            sortType: 'number',
            widthRatio: 20,
          },
        ]}
        isLoading={isExchangesDataLoading || isExchangesMetadataLoading}
      >
        <Table.FieldRow />
      </Table>
    );
  }, [rows, isExchangesDataLoading, isExchangesMetadataLoading]);

  const { isMobile } = useUserAgent();

  return (
    <article className={`space-y-4 ${className}`}>
      <Heading tagName="h3">Hot Exchanges</Heading>
      {isMobile ? Content : <Card color="glass">{Content}</Card>}
    </article>
  );
};

export default ExchangesTable;
