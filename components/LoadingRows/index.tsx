import { useMemo } from 'react';

export default function LoadingRows({ rowsCnt }: { rowsCnt: number }) {
  const rows = useMemo<number[]>(() => new Array(rowsCnt).fill(0), [rowsCnt]);

  return (
    <div className="min-w-[75%] max-w-[100%] grid grid-cols-3 gap-x-[0.5em] gap-y-[0.8em]">
      {rows.map((_, index) => (
        <div
          key={index}
          className={`h-[2.4em] Bg_skeleton ${
            isNthChild(index + 1, 4, 1) ? 'col-start-1 col-end-3' : isNthChild(index + 1, 4, 0) ? 'col-start-3 col-end-4' : ''
          }`}
        />
      ))}
    </div>
  );
}

function isNthChild(index: number, n: number, a: number) {
  return index % n === a;
}
