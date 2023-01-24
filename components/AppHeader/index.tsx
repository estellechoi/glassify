import Button from '@/components/Button';
import { useState } from 'react';
import Image from 'next/image';

const AppHeader = ({ className = '' }: { className?: string }) => {
  const [isWalletSelectModalOpen, setIsWalletSelectModalOpen] = useState<boolean>(false);

  return (
    <header className={`${className} w-full h-navbar bg-blend-saturation flex justify-between items-center gap-x-4`}>
      <Image src="https://static.coinpaprika.com/coin/usdt-tether/logo.png" width={24} height={24} />
      <Button label="Connect Wallet" onClick={() => setIsWalletSelectModalOpen(true)} />
    </header>
  );
};

export default AppHeader;
