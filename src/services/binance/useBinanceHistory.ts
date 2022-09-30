import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import { fetcher } from '../fetcher';

interface BinanceServerResponse {
  id: number;
  isBestMatch: boolean;
  isBuyerMaker: boolean;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
}

const fetchHistory = async (ticker: string) => {
  return fetcher(`${API_URL.BINANCE}/trades?symbol=${ticker}`);
};

export const useBinanceOrderHistory = (ticker: string) => {
  const { isLoading, isError, error, data } = useQuery(
    ['binance_history', ticker],
    () => fetchHistory(ticker),
    {
      enabled: !!ticker,
      select: (data) => {
        if (!Array.isArray(data)) return null;

        return data?.map((order: BinanceServerResponse) => ({
          amount: order.qty,
        }));
      },
    }
  );

  return { isLoading, isError, error, data };
};
