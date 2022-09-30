import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import { fetcher } from '../fetcher';

import { QueryKeys } from '../types';

export const useBitfinexPrice = (ticker: string) => {
  const { data, refetch, isLoading, isFetching } = useQuery(
    [QueryKeys.BITFINEX_PAIR, ticker],
    () => fetcher(`${API_URL.BITFINEX}/ticker/t${ticker}`),
    {
      enabled: !!ticker,
    }
  );

  return { data, refetch, isLoading, isFetching };
};
