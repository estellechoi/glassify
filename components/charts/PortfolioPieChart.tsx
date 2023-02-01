import { useMemo, useState } from 'react';
import PieChart from '../PieChart';
import { PieChartEntry } from '../PieChart/types';
import Tooltip from '../Tooltip';

export const PORTFOLIO_COLORS = [
  '#FFDEC0',
  '#FFBF83',
  '#FFA049',
  '#FD810E',
  '#DE6B00',
  '#B65800',
  '#914600',
  '#6E3500',
  '#4A2400',
  '#261200',
];

type PortfolioPieChartProps = {
  className?: string;
};

const PortfolioPieChart = ({ className }: PortfolioPieChartProps) => {
  const pieChartData = useMemo<PieChartEntry<string>[]>(() => {
    return [];
  }, []);

  const colorMap = useMemo(() => {
    return pieChartData.reduce(
      (accm, item, index) => ({
        ...accm,
        [item.type]: PORTFOLIO_COLORS[index] ?? PORTFOLIO_COLORS[PORTFOLIO_COLORS.length - 1],
      }),
      {}
    );
  }, [pieChartData]);

  const [chartHoverType, setChartHoverType] = useState<string | undefined>(undefined);

  const chartHoverContent = useMemo<JSX.Element>(() => {
    return <div>{chartHoverType}</div>;
  }, [chartHoverType]);

  return (
    <div className={`${className} flex justify-between md:justify-end items-center gap-x-6 md:gap-x-10`}>
      {/* legends */}
      <div className="grow-0 shrink-0 space-y-3 md:space-y-2"></div>

      {/* chart */}
      <div className="grow-0 shrink-0 w-min">
        <Tooltip followCursor={true} content={chartHoverContent}>
          <PieChart<string>
            data={pieChartData}
            colorMap={colorMap}
            size={128}
            type={chartHoverType}
            setType={setChartHoverType}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default PortfolioPieChart;
