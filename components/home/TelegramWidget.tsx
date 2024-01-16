'use client';

import { useEffect, useRef } from 'react';
import Card from '../Card';

const TelegramWidget = ({ className = '' }: { className?: string }) => {
  const telegramWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
    scriptElement.setAttribute('data-telegram-post', 'telegram/84');
    scriptElement.setAttribute('data-width', '100%');
    scriptElement.async = true;

    telegramWrapperRef.current?.appendChild(scriptElement);
  }, []);

  return telegramWrapperRef ? (
    <Card color="glass" className={`${className} pb-10`}>
      <div className={className} ref={telegramWrapperRef}></div>
    </Card>
  ) : (
    <></>
  );
};

export default TelegramWidget;
