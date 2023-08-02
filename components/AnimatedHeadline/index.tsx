import { useEffect, useMemo, useState } from 'react';
import TextMask from './TextMask';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export type AnimatedHeadlineProps = {
  tagName: HeadingTagName;
  texts: readonly string[];
  align?: 'left' | 'center' | 'right';
  className?: string;
};

const AnimatedHeadline = ({ tagName, texts, align = 'left', className = '' }: AnimatedHeadlineProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scaleClassName = isVisible ? 'scale-x-100' : 'scale-x-0';

  const Texts = useMemo<readonly JSX.Element[]>(
    () =>
      texts.map((text, index) => {
        const scaleDelayMs = (index + 1) * 1000;
        const maskTranslateDelayMs = scaleDelayMs + 1000;

        return (
          <span
            key={text}
            className={`relative w-fit overflow-hidden Transition_1000 transition-transform origin-left ${scaleClassName}`}
            style={{ transitionDelay: `${scaleDelayMs}ms` }}
          >
            {text}

            <TextMask isOff={isVisible} translateDelayMs={maskTranslateDelayMs} />
          </span>
        );
      }),
    [texts, isVisible, scaleClassName]
  );

  const alignClassName = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';
  const HeadingElement = tagName;

  return (
    <HeadingElement
      className={`Component flex flex-col ${alignClassName} Font_display_sm md:Font_display_md whitespace-pre text-black ${className}`}
    >
      {Texts}
    </HeadingElement>
  );
};

export default AnimatedHeadline;
