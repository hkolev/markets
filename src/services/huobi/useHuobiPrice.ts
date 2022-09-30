import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { QueryKeys } from '../types';

export const useHuobiPrice = (ticker: string) => {
  const { data, refetch, isLoading, isFetching } = useQuery(
    [QueryKeys.HUOBI_PAIR, ticker],
    () =>
      fetcher(
        `https://api.huobi.pro/market/detail?symbol=${ticker.toLowerCase()}`
      ),
    {
      enabled: !!ticker,
    }
  );

  return {
    data,
    refetch,
    isLoading,
    isFetching,
  };
};
