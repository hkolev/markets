import { useQuery } from '@tanstack/react-query';

import { API_URL } from '../constants';
import { fetcher } from '../fetcher';

const fetchHistory = async (ticker: string) => {
  return fetcher(`${API_URL.KRAKEN}/0/public/Depth?pair=${ticker}`);
};

export const useKrakenHistory = (ticker: string) => {
  const { isLoading, isError, error, data } = useQuery(
    ['kraken_history', ticker],
    () => fetchHistory(ticker),
    {
      enabled: !!ticker,
      select: (data) => {
        const canTrade = data?.result && Object.values(data.result)[0];
        let old;

        if (canTrade) {
          old = [];
          Object.keys(canTrade).forEach((key) => {
            old.push(
              ...canTrade[key].map((item: number[]) => ({
                amount: item[1].toString(),
              }))
            );
          });
        }

        return old;
      },
    }
  );

  return { isLoading, isError, error, data };
};
