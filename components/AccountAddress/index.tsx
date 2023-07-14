import Image from 'next/image';
import type { Wallet } from '@/types/wallet';
import CopyHelper from '@/components/CopyHelper';
import { shortenAddress } from '@/utils/text';

type AccountAddressProps = {
  address: string;
  wallet: Wallet;
};

const AccountAddress = ({ address, wallet }: AccountAddressProps) => {
  return (
    <CopyHelper toCopy={address} className="text-white">
      <span className="flex items-center gap-x-2">
        <Image src={wallet.logoUrl} alt={wallet.name} width={28} height={28} className="w-7 h-7" />
        <span className="w-full truncate Font_button_md">{shortenAddress(address)}</span>
      </span>
    </CopyHelper>
  );
};

export default AccountAddress;
