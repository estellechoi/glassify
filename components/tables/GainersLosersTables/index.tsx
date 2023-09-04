import { useMemo } from 'react';
import { useCMCGainersQuery, useCMCLatestListingsQuery, useCMCLosersQuery } from '@/data/hooks';
import Heading from '@/components/Heading';
import GainersLosersTable from './GainersLosersTable';
import useUserAgent from '@/hooks/useUserAgent';
import Card from '@/components/Card';
import useGainersLosersTableRowsGetter from './useGainersLosersTableRowsGetter';
import { TooltipLayer } from '@/components/Tooltip/styles';

const GainersLosersTables = ({ className = '', tooltipLayer }: { className?: string; tooltipLayer: TooltipLayer }) => {
  const { data: gainersData, isLoading: isGainersDataLoading } = useCMCGainersQuery({ limit: 5 });
  const { data: losersData, isLoading: isLosersDataLoading } = useCMCLosersQuery({ limit: 5 });
  const { data: latestListingsData, isLoading: isLatestListingsDataLoading } = useCMCLatestListingsQuery({ limit: 5 });

  const ids = useMemo<readonly number[]>(() => {
    const allIds = [latestListingsData, gainersData, losersData].reduce<number[]>((acc, data) => {
      const ids = data?.map((item) => item.id) ?? [];
      return [...acc, ...ids];
    }, []);

    return [...new Set(allIds)];
  }, [latestListingsData, gainersData, losersData]);

  const getRows = useGainersLosersTableRowsGetter(ids);

  const TopGainers = useMemo<JSX.Element>(() => {
    const rows = getRows(gainersData);
    return <GainersLosersTable tooltipContext={tooltipLayer} rows={rows} isLoading={isGainersDataLoading} />;
  }, [getRows, tooltipLayer, gainersData, isGainersDataLoading]);

  const TopLosers = useMemo<JSX.Element>(() => {
    const rows = getRows(losersData);
    return <GainersLosersTable tooltipContext={tooltipLayer} rows={rows} isLoading={isLosersDataLoading} />;
  }, [getRows, tooltipLayer, losersData, isLosersDataLoading]);

  const NewListings = useMemo<JSX.Element>(() => {
    const rows = getRows(latestListingsData);
    return <GainersLosersTable tooltipContext={tooltipLayer} rows={rows} isLoading={isLatestListingsDataLoading} />;
  }, [getRows, tooltipLayer, latestListingsData, isLatestListingsDataLoading]);

  const { isMobile } = useUserAgent();

  return (
    <div className={`space-y-20 ${className}`}>
      <article className="space-y-4">
        <Heading tagName="h3" className="px-page_x_mobile md:px-0">
          Top Gainers
        </Heading>
        {isMobile ? TopGainers : <Card color="glass">{TopGainers}</Card>}
      </article>

      <article className="space-y-4">
        <Heading tagName="h3" className="px-page_x_mobile md:px-0">
          Top Losers
        </Heading>
        {isMobile ? TopLosers : <Card color="glass">{TopLosers}</Card>}
      </article>

      <article className="space-y-4">
        <Heading tagName="h3" className="px-page_x_mobile md:px-0">
          New Listing
        </Heading>
        {isMobile ? NewListings : <Card color="glass">{NewListings}</Card>}
      </article>
    </div>
  );
};

export default GainersLosersTables;
