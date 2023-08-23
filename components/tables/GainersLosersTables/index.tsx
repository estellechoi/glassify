import { useMemo } from 'react';
import { useCMCGainersQuery, useCMCLatestListingsQuery, useCMCLosersQuery } from '@/data/hooks';
import Heading from '@/components/Heading';
import GainersLosersTable from './GainersLosersTable';
import useUserAgent from '@/hooks/useUserAgent';
import Card from '@/components/Card';
import useGainersLosersTableRowsGetter from './useGainersLosersTableRowsGetter';

const GainersLosersTables = ({ className = '' }: { className?: string }) => {
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
    return <GainersLosersTable rows={rows} isLoading={isGainersDataLoading} />;
  }, [getRows, gainersData, isGainersDataLoading]);

  const TopLosers = useMemo<JSX.Element>(() => {
    const rows = getRows(losersData);
    return <GainersLosersTable rows={rows} isLoading={isLosersDataLoading} />;
  }, [getRows, losersData, isLosersDataLoading]);

  const NewListings = useMemo<JSX.Element>(() => {
    const rows = getRows(latestListingsData);
    return <GainersLosersTable rows={rows} isLoading={isLatestListingsDataLoading} />;
  }, [getRows, latestListingsData, isLatestListingsDataLoading]);

  const { isMobile } = useUserAgent();

  return (
    <div className={`space-y-20 ${className}`}>
      <article className="space-y-4">
        <Heading tagName="h3">Top Gainers</Heading>
        {isMobile ? TopGainers : <Card color="glass">{TopGainers}</Card>}
      </article>

      <article className="space-y-4">
        <Heading tagName="h3">Top Losers</Heading>
        {isMobile ? TopLosers : <Card color="glass">{TopLosers}</Card>}
      </article>

      <article className="space-y-4">
        <Heading tagName="h3">New Listing</Heading>
        {isMobile ? NewListings : <Card color="glass">{NewListings}</Card>}
      </article>
    </div>
  );
};

export default GainersLosersTables;
