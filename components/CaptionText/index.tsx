type CaptionTextSize = 'xs';

const FONT_CLASS_DICT: Record<CaptionTextSize, string> = {
  xs: 'Font_caption_xs',
};

type CaptionTextProps = {
  text: string;
  shadowText?: string;
  size: CaptionTextSize;
  className?: string;
};
const CaptionText = ({ text, shadowText, size, className }: CaptionTextProps) => {
  const fontClassName = FONT_CLASS_DICT[size];

  return (
    <span className={`inline-flex items-baseline gap-x-1 text-white truncate ${fontClassName} ${className}`}>
      {text}
      {shadowText && <span className="opacity-50">{shadowText}</span>}
    </span>
  );
};

export default CaptionText;
