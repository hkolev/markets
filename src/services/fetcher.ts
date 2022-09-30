export const fetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};
