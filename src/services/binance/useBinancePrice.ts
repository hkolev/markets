import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';

import { fetcher } from '../fetcher';
import { QueryKeys } from '../types';

export const useBinancePrice = (ticker: string) => {
  const { data, refetch, isLoading, isFetching } = useQuery(
    [QueryKeys.BINANCE_PAIR, ticker],
    () => fetcher(`${API_URL.BINANCE}/ticker/price?symbol=${ticker}`),
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
