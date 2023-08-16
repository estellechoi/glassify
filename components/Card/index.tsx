import { ReactNode } from 'react';

type CardProps = { children: ReactNode; className?: string };

const Card = ({ children, className = '' }: CardProps) => {
  return <div className={`h-fit rounded-card Bg_glass Elevation_box_3 overflow-hidden ${className}`}>{children}</div>;
};

export default Card;
