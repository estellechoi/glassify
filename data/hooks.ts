import { useQuery } from '@tanstack/react-query';
import { getPublicClient, readContracts } from '@wagmi/core';
import { ChainId, type EthAddress } from '@/connectors/types';
import { ERC20ABI } from '@/data/abis';
import { CHAINS_DICT } from './constants';
import type { BalanceData } from './types';
import BigNumber from 'bignumber.js';
import { parseAmount } from './utils';

export const fetchBalance = async ({
  address,
  chainId,
  token,
}: {
  address: EthAddress;
  chainId: ChainId;
  token?: EthAddress;
}) => {
  if (token) {
    const erc20Config = { chainId, address: token, abi: ERC20ABI };

    const [value, decimals, symbol] = await readContracts({
      allowFailure: false,
      contracts: [
        {
          ...erc20Config,
          functionName: 'balanceOf',
          args: [address],
        },
        { ...erc20Config, functionName: 'decimals' },
        { ...erc20Config, functionName: 'symbol' },
      ],
    });

    const parsedValue = parseAmount(value, decimals);

    return {
      value: parsedValue,
      decimals,
      symbol,
    };
  }

  const value = await getPublicClient({ chainId }).getBalance({ address });
  const { decimals, symbol } = CHAINS_DICT[chainId].nativeCurrency;
  const parsedValue = parseAmount(value, decimals);

  return {
    value: parsedValue,
    decimals,
    symbol,
  };
};

export const useBalanceQuery = (params: { address: EthAddress; chainId: ChainId; token?: EthAddress }) => {
  const { address, chainId, token } = params;
  const queryKey = ['balance', address, chainId, token];

  return useQuery<BalanceData>(queryKey, async () => {
    const balance = await fetchBalance(params);
    return balance;
  });
};
