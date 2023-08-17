export type TagColor = 'secondary';
export type TagSize = 'sm';

export const COLOR_CLASS_DICS: Record<TagColor, string> = {
  secondary: 'bg-secondary text-ground',
};

export const SIZE_CLASS_DICS: Record<TagSize, string> = {
  sm: 'px-1.5 py-0',
};

export const FONT_CLASS_DICS: Record<TagSize, string> = {
  sm: 'Font_label_12px',
};

export type TagProps = {
  color?: TagColor;
  size: TagSize;
  label: string;
  className?: string;
};

const Tag = ({ color = 'secondary', size, label, className = '' }: TagProps) => {
  const colorClassName = COLOR_CLASS_DICS[color];
  const paddingClassName = SIZE_CLASS_DICS[size];
  const fontClassName = FONT_CLASS_DICS[size];
  const radiusClassName = 'rounded-tag';

  return (
    <span className={`${colorClassName} ${paddingClassName} ${fontClassName} ${radiusClassName} ${className}`}>{label}</span>
  );
};

export default Tag;
