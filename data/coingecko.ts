import { CoinPriceDict } from '@/types/coin';
import axios from 'axios';

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3';

const coinGecko = axios.create({
  baseURL: COINGECKO_ENDPOINT,
});

// export const fetchAllCoins = () => coinGecko.get<Coin[]>('/coins/list');

export const fetchCoinGeckoPrice = ({ ids, vs_currencies }: { ids: string[]; vs_currencies: string[] }) =>
  coinGecko.get<CoinPriceDict>('/simple/price', {
    params: {
      ids: ids.join(','),
      vs_currencies: vs_currencies.join(','),
    },
  });
