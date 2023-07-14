import Image from 'next/image';
import LOGO_LIGHT_URL from '@/resources/logos/logo_light.svg';
import LOGO_DARK_URL from '@/resources/logos/logo_dark.svg';

type AppLogoColor = 'light' | 'dark';
type AppLogoSize = 'md' | 'lg';

const LOGO_IMG_URL_DICT: Record<AppLogoColor, string> = {
  light: LOGO_DARK_URL,
  dark: LOGO_LIGHT_URL,
};

const LOGO_SIZE_CLASS_DICT: Record<AppLogoSize, { className: string; px: number }> = {
  md: { className: 'w-12', px: 48 },
  lg: { className: 'w-16', px: 64 },
};

type AppLogoProps = {
  color?: AppLogoColor;
  size?: AppLogoSize;
};

const AppLogo = ({ color = 'light', size = 'md' }: AppLogoProps) => {
  const src = LOGO_IMG_URL_DICT[color];
  const imgSize = LOGO_SIZE_CLASS_DICT[size];

  return <Image priority src={src} alt="App logo" width={imgSize.px} className={imgSize.className} />;
};

export default AppLogo;
