import { useCallback } from 'react';
import CoinLabel from '@/components/CoinLabel';
import { useCMCCoinMetadataQuery } from '@/data/hooks';
import { CMCListingItemData } from '@/pages/api/cmc/listings';
import { formatUSD } from '@/utils/number';
import UpDownNumberText from '@/components/UpDownNumberText';
import Tooltip from '@/components/Tooltip';

export type GainersLosersTableRow = {
  id: string;
  token: JSX.Element;
  chain: string;
  price: number;
  priceFormatted: string | JSX.Element;
  priceChange24h: number;
  priceChange24hFormatted: JSX.Element;
};

const useGainersLosersTableRowsGetter = (ids: readonly number[]) => {
  const { data: coinMetadata } = useCMCCoinMetadataQuery(ids);

  const getRows = useCallback(
    (data: readonly CMCListingItemData[] | undefined): readonly GainersLosersTableRow[] => {
      return (
        data?.map((item) => {
          const metadata = coinMetadata?.[item.id];

          const id = item.symbol;
          const token = (
            <Tooltip layer="base" content={metadata?.description} followCursor={true}>
              <CoinLabel size="lg" symbol={item.symbol} description={item.name ?? ''} logoURL={metadata?.logo} />
            </Tooltip>
          );

          const chain = metadata?.platform?.name ?? item.platform?.name ?? '';

          const price = item.quote.USD.price ?? 0;
          const priceFormatted = formatUSD(item.quote.USD.price, { fixDp: true });

          const priceChange24h = item.quote.USD.percent_change_24h ?? 0;
          const priceChange24hFormatted = <UpDownNumberText number={priceChange24h} unit="%" />;

          return {
            id,
            token,
            chain,
            price,
            priceFormatted,
            priceChange24h,
            priceChange24hFormatted,
          };
        }) ?? []
      );
    },
    [coinMetadata]
  );

  return getRows;
};

export default useGainersLosersTableRowsGetter;
