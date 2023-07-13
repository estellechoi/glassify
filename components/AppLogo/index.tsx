import Image from 'next/image';
import LOGO_LIGHT_URL from '@/resources/logos/logo_light.svg';
import LOGO_DARK_URL from '@/resources/logos/logo_dark.svg';

type AppLogoColor = 'light' | 'dark';
type AppLogoSize = 'md' | 'lg';

const LOGO_IMG_URL_DICT: Record<AppLogoColor, string> = {
  light: LOGO_DARK_URL,
  dark: LOGO_LIGHT_URL,
};

const LOGO_SIZE_CLASS_DICT: Record<AppLogoSize, string> = {
  md: 'w-12',
  lg: 'w-16',
};

type AppLogoProps = {
  color?: AppLogoColor;
  size?: AppLogoSize;
};

const AppLogo = ({ color = 'light', size = 'md' }: AppLogoProps) => {
  const src = LOGO_IMG_URL_DICT[color];
  const sizeClassName = LOGO_SIZE_CLASS_DICT[size];

  return <Image priority src={src} alt="App logo" className={sizeClassName} />;
};

export default AppLogo;
