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
      <WaitingSymbolUnit color={color} className="animate-bouncing_delayed_1" />
      <WaitingSymbolUnit color={color} className="animate-bouncing_delayed_2" />
      <WaitingSymbolUnit color={color} className="animate-bouncing_delayed_3" />
      <WaitingSymbolUnit color={color} className="animate-bouncing_delayed_4" />

      {/* <WaitingSymbolUnit color={color} className={is2ndStarted ? 'animate-bouncing_delayed_1' : ''} />
      <WaitingSymbolUnit color={color} className={is3rdStarted ? 'animate-bouncing_delayed_2' : ''} />
      <WaitingSymbolUnit color={color} className={is3rdStarted ? 'animate-bouncing_delayed_3' : ''} />
      <WaitingSymbolUnit color={color} className={is3rdStarted ? 'animate-bouncing_delayed_4' : ''} /> */}
    </div>
  );
};

export default WaitingSymbol;
