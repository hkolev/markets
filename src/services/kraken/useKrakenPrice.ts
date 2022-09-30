import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { QueryKeys } from '../types';
import { API_URL } from '../constants';

export const useKrakenPrice = (ticker: string) => {
  const { data, refetch, isLoading, isFetching } = useQuery(
    [QueryKeys.KRAKEN_PAIR, ticker],
    () => fetcher(`${API_URL.KRAKEN}/0/public/Ticker?pair=${ticker}`),
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
