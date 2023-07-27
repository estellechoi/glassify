import axios from 'axios';

export type CMCResponse<T extends any> = {
  data?: T;
  status: {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
};

export const CMC_API_ENDPOINT = 'https://pro-api.coinmarketcap.com';
export const cmc = axios.create({
  baseURL: CMC_API_ENDPOINT,
  headers: {
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_API_KEY,
  },
});
