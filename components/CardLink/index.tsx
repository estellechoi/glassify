import Link, { type LinkProps } from 'next/link';
import Card, { type CardColor } from '@/components/Card';
import Icon from '@/components/Icon';

type CardLinkProps = LinkProps & {
  label: string;
  color?: CardColor;
  className?: string;
};

/**
 *
 * @see https://nextjs.org/docs/pages/api-reference/components/link
 */
const CardLink = ({ label, color = 'primary', className = '', ...props }: CardLinkProps) => {
  const hoverAnimationClassName =
    'relative after:absolute after:inset-0 after:transition-colors after:Transition_500 hover:after:bg-black_o10';
  const cardGridClassName = 'flex justify-between items-center gap-x-2 px-card_padding_x py-card_padding_y';
  const fontClassName = 'Font_button_md';
  const hoverIconAnimationClassName = 'transition-transform Transition_500 group-hover/card-link:translate-x-1.5';

  return (
    <Link {...props} className={`group/card-link block ${hoverAnimationClassName} ${className}`}>
      <Card color={color} size="sm" className={cardGridClassName}>
        <span className={fontClassName}>{label}</span>
        <Icon type="arrow_forward" className={hoverIconAnimationClassName} />
      </Card>
    </Link>
  );
};

export default CardLink;
