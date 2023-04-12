import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

export type QueryResult<T> = UseQueryResult<AxiosResponse<T, unknown>, Error | AxiosError>;

type Pagination = {
  next_key: any;
  total: string;
};

export type BalanceResponse = {
  balances: { denom: string; amount: string }[];
  pagination: Pagination;
};
