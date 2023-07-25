import { useQuery } from '@tanstack/react-query';
import { type EthAddress } from '@/connectors/types';
import { CHAINS_DICT, getAlchemy } from './constants';
import type { BalanceData, UniswapTokensData } from './types';
import { parseAmount } from './utils';
import { ethers } from 'ethers';
import { ConnectedWallet } from '@/types/wallet';
import { BigNumber } from 'alchemy-sdk';
import axios from 'axios';

export const UNISWAP_TOKENS_ENDPOINT = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';

export const useTokensQuery = () => {
  const fetcher = () => axios.get<UniswapTokensData>(UNISWAP_TOKENS_ENDPOINT).then((res) => res.data);
  return useQuery<UniswapTokensData>(['tokens'], fetcher);
};

export const useEthBalanceQuery = ({ wallet, token }: { wallet: ConnectedWallet; token?: EthAddress }, refetchInterval = 0) => {
  const address = wallet.account.address;
  const chainId = wallet.connector.chainId;

  const queryKey = ['balance', wallet.account.address, chainId, token];

  return useQuery<BalanceData>(
    queryKey,
    async () => {
      const provider = await new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const { decimals, symbol } = CHAINS_DICT[chainId].nativeCurrency;
      const value = parseAmount(balance, decimals);

      return {
        value,
        decimals,
        symbol,
      };
    },
    {
      refetchInterval,
    }
  );
};

export const useENSNameQuery = (wallet: ConnectedWallet, refetchInterval = 0) => {
  const queryKey = ['ENSName', wallet.account.address];

  return useQuery<string | null>(
    queryKey,
    async () => {
      const provider = await new ethers.BrowserProvider(window.ethereum);
      const name = await provider.lookupAddress(wallet.account.address);
      return name;
    },
    { refetchInterval }
  );
};

/**
 *
 * @see https://docs.alchemy.com/reference/alchemy-gettokenbalances
 */
export const useBalancesQuery = (
  { wallet, tokens }: { wallet: ConnectedWallet; tokens?: readonly EthAddress[] },
  refetchInterval = 0
) => {
  const address = wallet.account.address;
  const chainId = wallet.connector.chainId;
  const queryKey = ['balances', address, chainId];

  return useQuery<readonly BalanceData[]>(
    queryKey,
    async () => {
      const alchemy = getAlchemy(chainId);
      const rawBalances = (await alchemy.core.getTokenBalances(address)).tokenBalances;

      return Promise.all(
        rawBalances.map(async (b) => {
          const hexEncoded = b.tokenBalance;
          const balance = hexEncoded ? BigNumber.from(hexEncoded).toBigInt() : BigInt(0);
          const meta = await alchemy.core.getTokenMetadata(b.contractAddress);

          const decimals = meta.decimals ?? 0;
          const symbol = meta.symbol ?? '';
          const value = parseAmount(balance, decimals);

          return {
            tokenAddress: b.contractAddress as EthAddress,
            value,
            decimals,
            symbol,
          };
        })
      );
    },
    {
      refetchInterval,
    }
  );
};
