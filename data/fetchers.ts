import web2 from '@/data/web2';
import type { CoinDetail } from '@/types/coin';

export const fetchCoins = () => web2.get('/coins');

export const fetchCoinById = (params: { id: string }) => web2.get<CoinDetail>(`/coins/${params.id}`);
