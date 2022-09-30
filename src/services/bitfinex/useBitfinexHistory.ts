import { useQuery } from '@tanstack/react-query';

import { API_URL } from '../constants';
import { fetcher } from '../fetcher';

const fetchHistory = async (ticker: string) => {
  const formattedTicker = ticker.replace('USDT', 'UST');

  return fetcher(`${API_URL.BITFINEX}/trades/t${formattedTicker}/hist`);
};

export const useBitfinexHistory = (ticker: string) => {
  const { data, isLoading, isError, error } = useQuery(
    ['bitfinex_history', ticker],
    () => fetchHistory(ticker),
    {
      enabled: !!ticker,
      select: (data: number[]) => {
        if (!data.length) return null;

        return data.map((order: any) => ({
          amount: Math.abs(order[2]).toString(),
        }));
      },
    }
  );

  return { isLoading, isError, error, data };
};
