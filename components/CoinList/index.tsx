import { CoinId } from '@/constants/coin';
import Coin from '@/components/Coin';
import { useCallback, useMemo } from 'react';

type CoinListProps = { coinIds: CoinId[]; pxSize?: number; stackDirection?: 'first-on-top' | 'last-on-top' };

const CoinList = ({ coinIds, pxSize = 24, stackDirection = 'first-on-top' }: CoinListProps) => {
  const uncoverPx = useMemo<number>(() => (pxSize * 2) / 3, [pxSize]);

  const wrapperPx = useMemo<number>(() => pxSize + uncoverPx * (coinIds.length - 1), [pxSize, uncoverPx, coinIds.length]);

  const getLeft = useCallback((index: number) => `${index * uncoverPx}px`, [uncoverPx]);

  return (
    <div className="relative flex items-center gap-x-2" style={{ width: `${wrapperPx}px`, height: `${pxSize}px` }}>
      {coinIds.map((coinId, index) => (
        <Coin
          key={coinId}
          coinId={coinId}
          pxSize={pxSize}
          className="absolute top-0"
          style={{
            left: getLeft(index),
            zIndex: stackDirection === 'first-on-top' ? coinIds.length - index : index,
          }}
        />
      ))}
    </div>
  );
};

export default CoinList;
