import axios, { AxiosError } from 'axios';
import { isDevEnv } from '@/utils/env';
import type { QueryResult } from '@/data/types';

export function handleError(error: Error | AxiosError | null): string {
  let errorMsg = '';

  if (error !== null) {
    if (axios.isAxiosError(error)) {
      console.group();

      if (error.response) {
        errorMsg = `Error occured: \n${
          error.response.data?.message ?? error.response.data ?? 'Unknown error'
        }`;
        if (isDevEnv) {
          console.log('Error response', error.response);
        }
      } else if (error.request) {
        errorMsg = 'Server is not responding currently.';
        if (isDevEnv) {
          console.log('Request was', error.request);
        }
      } else {
        errorMsg = 'Invalid request';
        if (isDevEnv) {
          console.log('Invalid request', error.message);
        }
      }

      console.groupEnd();
    }
  }

  return errorMsg;
}

export function handleResponse<T>({
  isLoading,
  isFetching,
  isSuccess,
  error,
  data,
}: QueryResult<T>) {
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
