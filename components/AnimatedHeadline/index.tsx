import { useEffect, useState } from 'react';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type AnimatedHeadlineProps = {
  tagName: HeadingTagName;
  texts: readonly string[];
  className?: string;
};

const AnimatedHeadline = ({ tagName, texts, className = '' }: AnimatedHeadlineProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scaleClassName = isVisible ? 'scale-x-100' : 'scale-x-0';
  const maskTranslateClassName = isVisible ? 'translate-x-full' : '0';

  const Texts = texts.map((text, index) => {
    const scaleDelayMs = (index + 1) * 700;
    const maskTranslateDelayMs = scaleDelayMs + 700;

    return (
      <span
        key={text}
        className={`relative w-fit overflow-hidden Transition_700 transition-transform origin-left ${scaleClassName}`}
        style={{ transitionDelay: `${scaleDelayMs}ms` }}
      >
        {text}

        <span
          aria-hidden
          className={`absolute inset-0 bg-black Transition_1000 transition-transform ${maskTranslateClassName}`}
          style={{ transitionDelay: `${maskTranslateDelayMs}ms` }}
        ></span>
      </span>
    );
  });

  const HeadingElement = tagName;

  return (
    <HeadingElement className={`Component flex flex-col Font_display_md whitespace-pre text-black ${className}`}>
      {Texts}
    </HeadingElement>
  );
};

export default AnimatedHeadline;
