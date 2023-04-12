import type { CoinCeckoCoin, CoinCeckoCoinDetail } from '@/types/coin';
import axios from 'axios';

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3';

const coinGecko = axios.create({
  baseURL: COINGECKO_ENDPOINT,
});

export const getCoins = () => coinGecko.get<CoinCeckoCoin[]>('/coins/list');

export const getCoinById = ({ id }: { id: string }) => coinGecko.get<CoinCeckoCoinDetail>(`/coins/${id}`);
