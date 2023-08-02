import { useEffect, useState } from 'react';
import WaitingSymbolUnit from './WaitingSymbolUnit';
import type { WaitingSymbolColor } from './types';

type WaitingSymbolProps = {
  color?: WaitingSymbolColor;
};

const WaitingSymbol = ({ color = 'white' }: WaitingSymbolProps) => {
  const [is2ndStarted, setIs2ndStarted] = useState(false);
  const [is3rdStarted, setIs3rdStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIs2ndStarted(true), 200);
    setTimeout(() => setIs3rdStarted(true), 400);
  }, []);

  return (
    <div className="flex justify-center items-center gap-x-0">
      <WaitingSymbolUnit color={color} className="animate-bouncing" />
      <WaitingSymbolUnit color={color} className={is2ndStarted ? 'animate-bouncing' : ''} />
      <WaitingSymbolUnit color={color} className={is3rdStarted ? 'animate-bouncing' : ''} />
    </div>
  );
};

export default WaitingSymbol;
