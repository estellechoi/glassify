import { ChainId } from '@/constants/connect';
import axios from 'axios';
import type { BalanceResponse } from './types';
import * as coingeckoApi from './coingeckoApi';

const INFURA_ETH2_KEY = process.env.NEXT_PUBLIC_INFURA_ETH2_KEY;

/**
 * @docs
 * @cosmoshub https://www.allthatnode.com/cosmos.dsrv
 * @crescent https://docs.crescent.network/other-information/network-configurations
 * @osmosis https://docs.osmosis.zone/api?v=LCD#/
 * @terra https://docs.terra.money/develop/endpoints/
 */
const CHAIN_LCD_ENDPOINT_DICT: { [key in ChainId]: string } = {
  [ChainId.COSMOS]: 'https://cosmos-mainnet-rpc.allthatnode.com:1317',
  [ChainId.CRESCENT]: 'https://mainnet.crescent.network:1317',
  [ChainId.OSMOSIS]: 'https://lcd.osmosis.zone',
  [ChainId.TERRA]: 'https://phoenix-lcd.terra.dev',
  [ChainId.ETHEREUM]: INFURA_ETH2_KEY
    ? `https://${INFURA_ETH2_KEY}@eth2-beacon-mainnet.infura.io`
    : 'https://api.mycryptoapi.com/eth',
};

const Axios = (chainId: ChainId) =>
  axios.create({
    baseURL: CHAIN_LCD_ENDPOINT_DICT[chainId],
  });

export const getBalances = ({ chainId, address }: { chainId: ChainId; address: string }) =>
  Axios(chainId).get<BalanceResponse>(`/cosmos/bank/v1beta1/balances/${address}`);

export const getCoinSupply = ({ chainId }: { chainId: ChainId }) =>
  Axios(chainId).get<BalanceResponse>(`/cosmos/bank/v1beta1/supply`);

export const coingecko = coingeckoApi;
