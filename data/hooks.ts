import { useQuery } from '@tanstack/react-query';
import { type EthAddress } from '@/connectors/types';
import { CHAINS_DICT, UNISWAP_TOKENS_ENDPOINT, getAlchemy } from './constants';
import type { BalanceData, OwnedNFTData, UniswapTokensData } from './types';
import { parseAmount } from './utils';
import { ethers } from 'ethers';
import type { ConnectedWallet } from '@/types/wallet';
import { BigNumber } from 'alchemy-sdk';
import axios from 'axios';

export const useTokensQuery = (refetchInterval = 0) => {
  const fetcher = () => axios.get<UniswapTokensData>(UNISWAP_TOKENS_ENDPOINT).then((res) => res.data);
  return useQuery<UniswapTokensData>(['tokens'], fetcher, { refetchInterval });
};

export const useENSNameQuery = (wallet: ConnectedWallet, refetchInterval = 0) => {
  const queryKey = ['ENSName', wallet.account.address];

  const fetcher = async () => {
    const provider = await new ethers.BrowserProvider(window.ethereum);
    return provider.lookupAddress(wallet.account.address);
  };

  return useQuery<string | null>(queryKey, fetcher, { refetchInterval });
};

export const useEthBalanceQuery = ({ wallet, token }: { wallet: ConnectedWallet; token?: EthAddress }, refetchInterval = 0) => {
  const address = wallet.account.address;
  const chainId = wallet.connector.chainId;

  const queryKey = ['balance', wallet.account.address, chainId, token];

  const fetcher = async () => {
    const provider = await new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    const { decimals, symbol } = CHAINS_DICT[chainId].nativeCurrency;
    const value = parseAmount(balance, decimals);

    return {
      value,
      decimals,
      symbol,
    };
  };

  return useQuery<BalanceData>(queryKey, fetcher, { refetchInterval });
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

  const fetcher = async () => {
    const alchemy = getAlchemy(chainId);
    const rawBalances = (await alchemy.core.getTokenBalances(address)).tokenBalances;

    return Promise.all(
      rawBalances.map(async (b) => {
        const encodedBalance = b.tokenBalance;
        const balance = encodedBalance ? BigNumber.from(encodedBalance).toBigInt() : BigInt(0);
        const metadata = await alchemy.core.getTokenMetadata(b.contractAddress);

        const decimals = metadata.decimals ?? 0;
        const symbol = metadata.symbol ?? '';
        const value = parseAmount(balance, decimals);

        const tokenAddress = b.contractAddress as EthAddress;

        return {
          tokenAddress,
          value,
          decimals,
          symbol,
        };
      })
    );
  };

  return useQuery<readonly BalanceData[]>(queryKey, fetcher, { refetchInterval });
};

/**
 *
 * @see https://docs.alchemy.com/reference/nft-api-quickstart#3-choose-a-library
 */
export const useNFTsQuery = ({ wallet }: { wallet: ConnectedWallet }, refetchInterval = 0) => {
  const address = wallet.account.address;
  const chainId = wallet.connector.chainId;
  const queryKey = ['nfts', address, chainId];

  const fetcher = async () => {
    const alchemy = getAlchemy(chainId);
    const ownedNFTs = (await alchemy.nft.getNftsForOwner(address)).ownedNfts;

    return Promise.all(
      ownedNFTs.map(async (ownedNFT) => {
        const metadata = await alchemy.nft.getContractMetadata(ownedNFT.contract.address);
        return {
          ...ownedNFT,
          metadata,
        };
      })
    );
  };

  return useQuery<readonly OwnedNFTData[]>(queryKey, fetcher, { refetchInterval });
};
