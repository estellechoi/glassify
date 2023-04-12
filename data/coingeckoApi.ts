import type { CoinCeckoCoin, CoinCeckoCoinDetail, CoinId } from '@/types/coin';
import axios from 'axios';

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3';

const coinGecko = axios.create({
  baseURL: COINGECKO_ENDPOINT,
});

export const getCoins = () => coinGecko.get<CoinCeckoCoin[]>('/coins/list');

export const getCoinById = ({ id }: { id: CoinId }) => coinGecko.get<CoinCeckoCoinDetail>(`/coins/${id}`);
