import { TITLES } from '@/constants/app';
import AnimatedHeadline, { type AnimatedHeadlineProps } from '@/components/AnimatedHeadline';

const AppHeadline = () => {
  const headlineProps: AnimatedHeadlineProps = {
    tagName: 'h2',
    texts: TITLES.HOME,
  };

  return (
    <>
      <AnimatedHeadline {...headlineProps} className="hidden md:flex" />
      <AnimatedHeadline {...headlineProps} align="center" className="md:hidden" />
    </>
  );
};

export default AppHeadline;
