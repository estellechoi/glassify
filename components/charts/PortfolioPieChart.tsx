import { formatNumber } from '@/utils/number';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import Coin from '../Coin';
import { PieChartEntry } from '../PieChart/types';
import Tooltip from '../Tooltip';
import dynamic from 'next/dynamic';
import { PieChartProps } from '@/components/PieChart';

/** @description rechart components must not be pre-rendered, it uses browser apis */
const PieChart = dynamic<PieChartProps<string>>(() => import('@/components/PieChart'), {
  ssr: false,
});

export const PORTFOLIO_COLORS = [
  'var(--color-gray900)',
  'var(--color-gray800)',
  'var(--color-gray700)',
  'var(--color-gray600)',
  'var(--color-gray500)',
  'var(--color-gray400)',
  'var(--color-gray300)',
  'var(--color-gray200)',
  'var(--color-gray100)',
  'var(--color-gray50)',
];

type PortfolioPieChartProps = {
  holdings: any[];
  totalBalanceUSD: BigNumber;
  className?: string;
};

const PortfolioPieChart = ({ holdings, totalBalanceUSD, className }: PortfolioPieChartProps) => {
  const pieChartData = useMemo<PieChartEntry<string>[]>(() => {
    return holdings
      .sort((a, b) => (a.amountFiat.usd.minus(b.amountFiat.usd).gt(0) ? -1 : 1))
      .map((holding) => {
        return {
          type: holding.denom,
          label: holding.ticker,
          value: holding.amountFiat.usd.toNumber(),
        };
      });
  }, [holdings]);

  const colorMap = useMemo<{
    [x: string]: string;
  }>(() => {
    return pieChartData.reduce(
      (accm, item, index) => ({
        ...accm,
        [item.type]: PORTFOLIO_COLORS[index] ?? PORTFOLIO_COLORS[PORTFOLIO_COLORS.length - 1],
      }),
      {}
    );
  }, [pieChartData]);

  const [chartHoverType, setChartHoverType] = useState<string | undefined>(undefined);

  const chartHoverContent = useMemo<JSX.Element | undefined>(() => {
    const hoverHolding = holdings.find((holding) => holding.denom === chartHoverType);

    return hoverHolding ? (
      <div className="flex items-center gap-x-4 text-body">
        <div className="flex items-center">
          <div className="Font_data_32px_num">
            {formatNumber(hoverHolding.amountFiat.usd.div(totalBalanceUSD).multipliedBy(100), { dp: 0 })}
          </div>
          <div className="Font_data_32px_unit">%</div>
        </div>

        <div className="flex items-center gap-x-3">
          <Coin coinId={hoverHolding.coinGeckoId} pxSize={32} />
          <div className="space-y-0">
            <div className="Font_data_16px_num">
              {formatNumber(hoverHolding.amountFiat.usd, {
                fiat: true,
              })}
            </div>
            <div className="flex items-baseline gap-x-1 text-caption_dark">
              <div className="Font_data_12px_num">{formatNumber(hoverHolding.amount, { dp: hoverHolding.decimal })}</div>
              <div className="Font_data_12px_unit">{hoverHolding.ticker}</div>
            </div>
          </div>
        </div>
      </div>
    ) : undefined;
  }, [chartHoverType, holdings]);

  return (
    <div className={`${className} flex justify-between md:justify-end items-center gap-x-6 md:gap-x-10`}>
      {/* chart */}
      <div className="grow-0 shrink-0 w-min">
        <Tooltip followCursor={true} type="any" content={chartHoverContent}>
          <PieChart data={pieChartData} colorMap={colorMap} size={128} type={chartHoverType} setType={setChartHoverType} />
        </Tooltip>
      </div>

      {/* legends */}
      <div className="grow-0 shrink-0 space-y-3 md:space-y-2">
        {pieChartData.map((item) => (
          <div key={item.type} className="grid grid-cols-3 gap-x-1">
            <div className="flex items-center gap-x-2">
              <div className="w-3 h-2" style={{ background: colorMap[item.type] ?? 'var(--color-black)' }}></div>
              <div className="Font_label_14px">{item.label}</div>
            </div>

            <div className="flex items-center col-span-2 pl-3">
              <div className="Font_data_20px_num">
                {formatNumber(new BigNumber(item.value).div(totalBalanceUSD).multipliedBy(100), { dp: 0 })}
              </div>
              <div className="Font_data_20px_unit">%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPieChart;
