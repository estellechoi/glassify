import type { ReactNode } from 'react';

type HeadingTagName = 'h2' | 'h3' | 'h4' | 'h5';

const FONT_CLASS_DICT: Record<HeadingTagName, string> = {
  h2: 'Font_display_xs',
  h3: 'Font_title_md',
  h4: 'Font_title_sm',
  h5: 'Font_title_xs',
};

type HeadingProps = {
  children: ReactNode;
  tagName: HeadingTagName;
  className?: string;
};

const Heading = ({ children, tagName, className = '' }: HeadingProps) => {
  const HeadingElement = tagName;
  const fontClassName = FONT_CLASS_DICT[tagName];

  return <HeadingElement className={`Component inline-flex ${fontClassName} ${className}`}>{children}</HeadingElement>;
};

export default Heading;
