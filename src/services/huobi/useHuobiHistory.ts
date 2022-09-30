import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import { fetcher } from '../fetcher';

interface HuobiDataResponse {
  amount: number;
  direction: string;
  id: number;
  price: number;
  tradeId: number;
  ts: number;
}

interface HuobiServerResponse {
  data: HuobiDataResponse[];
  id: number;
  ts: number;
}

const fetchHistory = async (ticker: string) => {
  return fetcher(
    `${
      API_URL.HUOBI
    }/market/history/trade?symbol=${ticker.toLowerCase()}&size=300`
  );
};

export const useHuobiHistory = (ticker: string) => {
  const { isLoading, isError, error, data } = useQuery(
    ['huobi_history', ticker],
    () => fetchHistory(ticker),
    {
      enabled: !!ticker,
      select: (data) => {
        if (!data) return null;

        return data?.data?.map((el: HuobiServerResponse) => {
          return {
            amount: el.data[0].amount.toString(),
          };
        });
      },
    }
  );

  return { data, isLoading, isError, error };
};
