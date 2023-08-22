import { useQuery } from '@tanstack/react-query';
import { type EthAddress } from '@/connectors/types';
import { CHAINS_DICT, UNISWAP_TOKENS_ENDPOINT, getAlchemy } from './constants';
import type { BalanceData, OwnedNFTData, UniswapTokensData } from './types';
import { parseAmount } from './utils';
import { ethers } from 'ethers';
import type { ConnectedWallet } from '@/types/wallet';
import { BigNumber, type FloorPriceError, type FloorPriceMarketplace } from 'alchemy-sdk';
import axios from 'axios';
import type { CMCQuoteData } from '@/pages/api/cmc/quotes';
import { CMCListingItemData } from '@/pages/api/cmc/listings';
import { CMCMetadataItemData } from '@/pages/api/cmc/metadata';
import { ExchangeDetailData } from '@/pages/api/cmc/exchanges/metadata';
import { ExchangeData } from '@/pages/api/cmc/exchanges';

export const useTokensQuery = (refetchInterval = 0) => {
  const fetcher = () => axios.get<UniswapTokensData>(UNISWAP_TOKENS_ENDPOINT).then((res) => res.data);
  return useQuery<UniswapTokensData>(['tokens'], fetcher, { refetchInterval });
};

export const useENSNameQuery = (wallet: ConnectedWallet, refetchInterval = 0) => {
  const queryKey = ['ENSName', wallet.account.address];

  const fetcher = async () => {
    const provider = await new ethers.BrowserProvider(wallet.connector.provider);
    return provider.lookupAddress(wallet.account.address);
  };

  return useQuery<string | null>(queryKey, fetcher, { refetchInterval });
};

export const useEthBalanceQuery = ({ wallet }: { wallet: ConnectedWallet }, refetchInterval = 0) => {
  const address = wallet.account.address;
  const chainId = wallet.connector.chainId;

  const queryKey = ['ethBalance', wallet.account.address, chainId];

  const fetcher = async () => {
    const provider = await new ethers.BrowserProvider(wallet.connector.provider);
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
        const marketplace = (await alchemy.nft.getFloorPrice(ownedNFT.contract.address)).looksRare;

        return {
          ...ownedNFT,
          marketplace,
        };
      })
    );
  };

  return useQuery<readonly OwnedNFTData[]>(queryKey, fetcher, { refetchInterval });
};

/**
 *
 * @see https://docs.alchemy.com/reference/sdk-getfloorprice
 */
// export const useNFTFloorPriceQuery = (
//   { wallet, contractAddress }: { wallet: ConnectedWallet; contractAddress?: string },
//   refetchInterval = 0
// ) => {
//   const chainId = wallet.connector.chainId;
//   const queryKey = ['nftFloorPrice', contractAddress, chainId];

//   const fetcher = async () => {
//     const alchemy = getAlchemy(chainId);
//     return (await alchemy.nft.getFloorPrice(contractAddress ?? '')).looksRare;
//   };

//   return useQuery<FloorPriceMarketplace | FloorPriceError>(queryKey, fetcher, { refetchInterval, enabled: !!contractAddress });
// };

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
 */
export const useCMCQuotesQuery = (symbols: readonly string[], refetchInterval = 0) => {
  const symbolsQuery = symbols.join(',');
  const fetcher = () => axios.get('/api/cmc/quotes', { params: { symbol: symbolsQuery } }).then((res) => res.data);
  return useQuery<{
    [symbol: string]: readonly CMCQuoteData[];
  }>(['cmcQuotes', symbolsQuery], fetcher, { refetchInterval, enabled: symbols.length > 0 });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
 */
export const useCMCLatestListingsQuery = (options?: { limit?: number }, refetchInterval = 0) => {
  const fetcher = () =>
    axios.get('/api/cmc/listings', { params: { limit: options?.limit, sort: 'date_added' } }).then((res) => res.data);
  return useQuery<readonly CMCListingItemData[]>(['cmcLatestListings', options?.limit ?? 100], fetcher, { refetchInterval });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
 */
export const useCMCGainersQuery = (options?: { limit?: number; period?: '24h' | '7d' }, refetchInterval = 0) => {
  const period = options?.period ?? '24h';
  const sort = period === '24h' ? 'percent_change_24h' : 'percent_change_7d';

  const fetcher = () =>
    axios.get('/api/cmc/listings', { params: { limit: options?.limit, sort, sort_dir: 'desc' } }).then((res) => res.data);
  return useQuery<readonly CMCListingItemData[]>(['cmcGainers', period, options?.limit ?? 100], fetcher, { refetchInterval });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
 */
export const useCMCLosersQuery = (options?: { limit?: number; period?: '24h' | '7d' }, refetchInterval = 0) => {
  const period = options?.period ?? '24h';
  const sort = period === '24h' ? 'percent_change_24h' : 'percent_change_7d';

  const fetcher = () =>
    axios.get('/api/cmc/listings', { params: { limit: options?.limit, sort, sort_dir: 'asc' } }).then((res) => res.data);
  return useQuery<readonly CMCListingItemData[]>(['cmcLosers', period, options?.limit ?? 100], fetcher, { refetchInterval });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyInfo
 */
export const useCMCCoinMetadataQuery = (ids: readonly number[], refetchInterval = 0) => {
  const idsQuery = ids.join(',');

  const fetcher = () => axios.get('/api/cmc/metadata', { params: { id: idsQuery } }).then((res) => res.data);
  return useQuery<{ [id: string]: CMCMetadataItemData }>(['cmcMetaData', idsQuery], fetcher, {
    refetchInterval,
    enabled: ids.length > 0,
  });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1ExchangeMap
 */
export const useCMCExchangesQuery = (options?: { limit?: number }, refetchInterval = 0) => {
  const fetcher = () =>
    axios.get('/api/cmc/exchanges', { params: { sort: 'volume_24h', limit: options?.limit ?? 10 } }).then((res) => res.data);
  return useQuery<readonly ExchangeData[]>(['cmcExchanges', options?.limit], fetcher, {
    refetchInterval,
  });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV1ExchangeInfo
 */
export const useCMCExchangesMetadataQuery = (ids: readonly number[], refetchInterval = 0) => {
  const idsQuery = ids.join(',');

  const fetcher = () => axios.get('/api/cmc/exchanges/metadata', { params: { id: idsQuery } }).then((res) => res.data);
  return useQuery<{ [id: string]: ExchangeDetailData }>(['cmcExchangesMetaData', idsQuery], fetcher, {
    refetchInterval,
    enabled: ids.length > 0,
  });
};

/**
 *
 * @see https://coinmarketcap.com/api/documentation/v1/#operation/getV3CryptocurrencyQuotesHistorical
 * @description this is not free endpoint
 */
export const useCMCQuotesHistoryQuery = (symbols: readonly string[], refetchInterval = 0) => {
  const symbolsQuery = symbols.join(',');
  const fetcher = () => axios.get('/api/cmc/history', { params: { symbol: symbolsQuery } }).then((res) => res.data);
  return useQuery<{
    [symbol: string]: readonly CMCQuoteData[];
  }>(['cmcQuotes', symbolsQuery], fetcher, { refetchInterval, enabled: symbols.length > 0 });
};
