import web2 from '@/data/web2';

export const fetchCoins = () => web2.get('/coins');

export const fetchCoinById = (params: { coin_id: string }) => web2.get('/coins', { params });
