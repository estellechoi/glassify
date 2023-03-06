export const getCSS = (key: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(key).trim();
};
