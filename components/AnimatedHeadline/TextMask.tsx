import { CSSProperties, useMemo } from 'react';

const TextMask = ({ translateDelayMs, isOff }: { translateDelayMs: number; isOff: boolean }) => {
  const style = useMemo<CSSProperties>(() => ({ transitionDelay: `${translateDelayMs}ms` }), [translateDelayMs]);
  const maskTranslateClassName = isOff ? 'translate-x-full' : '0';

  return (
    <span
      aria-hidden
      className={`absolute inset-0 bg-black Transition_1000 transition-transform ${maskTranslateClassName}`}
      style={style}
    ></span>
  );
};

export default TextMask;
