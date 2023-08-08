import { TITLES } from '@/constants/app';
import AnimatedHeadline, { type AnimatedHeadlineProps } from '@/components/AnimatedHeadline';

type AppHeadlineProps = {
  className?: string;
  onAnimationEnd?: () => void;
};

const AppHeadline = ({ className = '', onAnimationEnd }: AppHeadlineProps) => {
  const headlineProps: AnimatedHeadlineProps = {
    tagName: 'h2',
    texts: TITLES.HOME,
  };

  return <AnimatedHeadline {...headlineProps} className={className} onAnimationEnd={onAnimationEnd} />;
};

export default AppHeadline;
