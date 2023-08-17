import { ReactNode } from 'react';

export type CardColor = 'primary' | 'on_primary' | 'glass';
export type CardSize = 'sm' | 'md';

const CARD_BG_COLOR_DICT: Record<CardColor, string> = {
  primary: 'bg-primary text-ground',
  on_primary: 'bg-ground text-primary',
  glass: 'Bg_glass Elevation_box_3',
};

const CARD_RADIUS_CLASS_DICT: Record<CardSize, string> = {
  sm: 'rounded-card_sm',
  md: 'rounded-card_md',
};

type CardProps = { children: ReactNode; color?: CardColor; size?: CardSize; className?: string };

const Card = ({ children, color = 'primary', size = 'md', className = '' }: CardProps) => {
  const bgClassName = CARD_BG_COLOR_DICT[color];
  const radiusClassName = CARD_RADIUS_CLASS_DICT[size];

  return <div className={`h-fit overflow-hidden ${bgClassName} ${radiusClassName} ${className}`}>{children}</div>;
};

export default Card;
