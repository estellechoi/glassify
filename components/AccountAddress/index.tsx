import Image from 'next/image';
import type { ConnectedWallet } from '@/types/wallet';
import CopyHelper from '@/components/CopyHelper';
import { shortenAddress } from '@/utils/text';
import { useCallback, useState } from 'react';
import { useENSNameQuery } from '@/data/hooks';

type AccountAddressProps = {
  wallet: ConnectedWallet;
};

const AccountAddress = ({ wallet }: AccountAddressProps) => {
  const address = wallet.account.address;

  const { data: ENSName } = useENSNameQuery(wallet);

  return (
    <CopyHelper toCopy={address} className="text-white">
      <span className="flex items-center gap-x-2">
        <Image src={wallet.logoURL} alt={wallet.name} width={28} height={28} className="w-7 h-7" />
        <span className="w-full truncate Font_button_md">{ENSName ?? shortenAddress(address, 4, 4)}</span>
      </span>
    </CopyHelper>
  );
};

export default AccountAddress;
