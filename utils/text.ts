export const getAbbrOf = (string: string, over: number): string =>
  string.length > over ? `${string.slice(0, over - 3)}・・・${string.slice(-3)}` : string;
