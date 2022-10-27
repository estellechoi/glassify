export interface QueryRes<T> {
  curTimestamp: number;
  data: T;
  result: 'ok' | 'error'; // dummy typing
}
