import axios, { AxiosError } from 'axios';
import { isDevEnv } from '@/utils/env';
import type { QueryResult } from '@/data/types';

export function handleError(error: Error | AxiosError | null): undefined {
  if (error !== null && axios.isAxiosError(error)) {
    console.group();

    if (error.response) {
      if (isDevEnv) {
        console.log('Error response', error.response);
        console.log('Error msg', `Error occured: \n${error.response.data?.message ?? error.response.data ?? 'Unknown error'}`);
      }
    } else if (error.request) {
      if (isDevEnv) {
        console.log('Request was', error.request);
        console.log('Error msg', 'Server is not responding currently.');
      }
    } else {
      if (isDevEnv) {
        console.log('Invalid request', error.message);
        console.log('Error msg', 'Invalid request');
      }
    }

    console.groupEnd();
  }

  return undefined;
}

export function handleResponse<T>({ isLoading, isFetching, isSuccess, error, data }: QueryResult<T>) {
  const errorMsg = handleError(error);

  return {
    isLoading,
    isFetching,
    isSuccess,
    error,
    errorMsg,
    data: data?.data,
  };
}
