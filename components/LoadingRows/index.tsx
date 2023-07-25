import { useMemo } from 'react';

type LoadingRowsProps = { rowsCnt: number; fontClassName?: string; type?: 'span' | 'grid' };

export default function LoadingRows({ rowsCnt, fontClassName, type = 'span' }: LoadingRowsProps) {
  const rows = useMemo<number[]>(() => new Array(rowsCnt).fill(0), [rowsCnt]);

  return (
    <div className="animate-pulse min-w-[75%] max-w-[100%] grid grid-cols-3 gap-x-[0.5em] gap-y-[0.8em]">
      <span className="sr-only">Loading...</span>

      {rows.map((_, index) => (
        <div
          key={index}
          aria-hidden
          className={`h-[1em] Bg_skeleton ${fontClassName} ${
            type === 'span'
              ? 'col-span-3'
              : isNthChild(index + 1, 4, 1)
              ? 'col-start-1 col-end-3'
              : isNthChild(index + 1, 4, 0)
              ? 'col-start-3 col-end-4'
              : ''
          }`}
        />
      ))}
    </div>
  );
}

function isNthChild(index: number, n: number, a: number) {
  return index % n === a;
}
