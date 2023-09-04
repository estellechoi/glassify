import { useEffect, useMemo } from 'react';
import { ConnectedWallet } from '@/types/wallet';
import useBalance from '@/hooks/useBalance';
import { formatUSD } from '@/utils/number';
import Table from '@/components/Table';
import useUserAgent from '@/hooks/useUserAgent';
import UpDownNumberText from '@/components/UpDownNumberText';
import type { TableField } from '@/components/Table/types';
import CoinLabel from '@/components/CoinLabel';
import type { TooltipLayer } from '@/components/Tooltip/styles';
import Card from '../Card';
import Heading from '../Heading';

type BalanceTokensTableRow = {
  id: string;
  token: JSX.Element;
  marketCap: number;
  price: number;
  priceChange: number;
  vol24H: number;
  vol24HChange: number;
  marketCapFormatted: string | JSX.Element;
  priceFormatted: string | JSX.Element;
  priceChangeFormatted: JSX.Element;
  priceChangeResponsive: JSX.Element;
  vol24HFormatted: string | JSX.Element;
  vol24HChangeFormatted: JSX.Element;
};

type BalanceTokensTableProps = {
  wallet: ConnectedWallet;
  onLoaded?: () => void;
  tooltipContext: TooltipLayer;
  className?: string;
};

const BalanceTokensTable = ({ wallet, onLoaded, tooltipContext, className = '' }: BalanceTokensTableProps) => {
  const { balance, isLoading } = useBalance(wallet);

  useEffect(() => {
    if (isLoading) onLoaded?.();
  }, [isLoading]);

  const rows = useMemo<readonly BalanceTokensTableRow[]>(() => {
    return balance.marketValues.map((marketValue) => {
      const id = marketValue.symbol;
      const token = <CoinLabel size="lg" symbol={marketValue.symbol} />;

      const marketCap = marketValue.marketCap ?? 0;
      const marketCapFormatted = formatUSD(marketValue.marketCap, { compact: true });

      const vol24HChange = marketValue.vol24HChangePercentage ?? -1000000;
      const vol24HChangeFormatted = <UpDownNumberText number={vol24HChange} unit="%" />;

      const vol24H = marketValue.vol24H ?? 0;
      const vol24HFormatted = formatUSD(marketValue.vol24H, { compact: true });

      const priceChange = marketValue.priceChange24H ?? -1000000;
      const priceChangeFormatted = <UpDownNumberText number={priceChange} unit="%" />;

      const price = marketValue.price.USD ?? 0;
      const priceFormatted = formatUSD(marketValue.price.USD, { fixDp: true });

      const priceChangeResponsive = (
        <>
          <div className="hidden md:block">{priceChangeFormatted}</div>
          <div className="md:hidden flex flex-col text-right">
            {priceFormatted}
            {priceChangeFormatted}
          </div>
        </>
      );

      return {
        id,
        token,
        marketCap,
        marketCapFormatted,
        price,
        priceFormatted,
        priceChange,
        priceChangeFormatted,
        priceChangeResponsive,
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
          // {
          //   label: 'Market cap',
          //   value: 'marketCapFormatted',
          //   type: 'number',
          //   sortValue: 'marketCap',
          //   sortType: 'number',
          //   align: 'right',
          // },
          {
            label: 'Vol. 24H',
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
            widthPx: 120,
          },
          {
            label: 'Price',
            value: 'priceFormatted',
            type: 'number',
            sortValue: 'price',
            sortType: 'number',
            align: 'right',
            // widthRatio: 20,
          },
        ];

    return [
      {
        label: 'Token',
        value: 'token',
        type: 'jsx',
        widthRatio: 20,
        loaderType: 'coin_label',
      },
      ...expandedFields,
      {
        label: isMobile ? 'Price' : 'Change',
        value: 'priceChangeResponsive',
        type: 'jsx',
        align: 'right',
        sortValue: 'priceChange',
        sortType: 'number',
        widthPx: 120,
      },
    ];
  }, [isMobile]);

  const Content = useMemo<JSX.Element>(() => {
    return (
      <Table<BalanceTokensTableRow>
        dSortValue="priceChange"
        tooltipContext={tooltipContext}
        rows={rows}
        fields={fields}
        isLoading={isLoading}
      >
        <Table.FieldRow />
      </Table>
    );
  }, [rows, fields, isLoading, tooltipContext]);

  return (
    <article className={`space-y-4 ${className}`}>
      <Heading tagName="h3" className="px-page_x_mobile md:px-0">
        My Holdings
      </Heading>
      {isMobile ? Content : <Card color="glass">{Content}</Card>}
    </article>
  );
};

export default BalanceTokensTable;
