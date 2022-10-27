export const abbrOver = (string: string, over: number) => (string.length > over ? `${string.slice(0, over)}・・・${string.slice(-3)}` : string);
