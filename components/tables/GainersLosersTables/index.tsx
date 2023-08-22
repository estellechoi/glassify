import { useMemo } from 'react';
import { useCMCGainersQuery, useCMCLosersQuery } from '@/data/hooks';
import Heading from '@/components/Heading';
import GainersLosersTable from './GainersLosersTable';
import useUserAgent from '@/hooks/useUserAgent';
import Card from '@/components/Card';
import useGainersLosersTableRowsGetter from './useGainersLosersTableRowsGetter';

const GainersLosersTables = ({ className = '' }: { className?: string }) => {
  const { data: gainersData, isLoading: isGainersDataLoading } = useCMCGainersQuery({ limit: 5 });
  const { data: losersData, isLoading: isLosersDataLoading } = useCMCLosersQuery({ limit: 5 });

  console.log('gainersData', gainersData);

  const ids = useMemo<readonly number[]>(() => {
    const allIds = [gainersData, losersData].reduce<number[]>((acc, data) => {
      const ids = data?.map((item) => item.id) ?? [];
      return [...acc, ...ids];
    }, []);

    return [...new Set(allIds)];
  }, [gainersData, losersData]);

  const getRows = useGainersLosersTableRowsGetter(ids);

  const TopGainers = useMemo<JSX.Element>(() => {
    const rows = getRows(gainersData);
    return <GainersLosersTable rows={rows} isLoading={isGainersDataLoading} />;
  }, [getRows, gainersData, isGainersDataLoading]);

  const TopLosers = useMemo<JSX.Element>(() => {
    const rows = getRows(losersData);
    return <GainersLosersTable rows={rows} isLoading={isLosersDataLoading} />;
  }, [getRows, losersData, isLosersDataLoading]);

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
    </div>
  );
};

export default GainersLosersTables;
