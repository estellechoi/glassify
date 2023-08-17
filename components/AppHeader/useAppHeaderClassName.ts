import { useMemo } from 'react';
import useScrollPosition from '@/hooks/useScrollPosition';

const useAppHeaderClassName = () => {
  const { isYScrolled } = useScrollPosition();

  const bgClassName = useMemo<string>(
    () => `transition-[backdrop-filter,background-color] ${isYScrolled ? 'Bg_glass_thin' : ''}`,
    [isYScrolled]
  );
  const gridClassName = 'h-app_header flex items-center justify-between px-8';

  return `${gridClassName} ${bgClassName}`;
};

export default useAppHeaderClassName;
