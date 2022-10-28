import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

export type QueryResult<T> = UseQueryResult<AxiosResponse<T, unknown>, Error | AxiosError>;
