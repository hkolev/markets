import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useBinancePrice } from '../../services/binance/useBinancePrice';
import { useBitfinexPrice } from '../../services/bitfinex/useBitfinexPrice';
import { useHuobiPrice } from '../../services/huobi/useHuobiPrice';
import { useKrakenPrice } from '../../services/kraken/useKrakenPrice';
import { DataWithLoader } from '../../components/DataWithLoader';
import { Exchanges } from '../../services/constants';

import { HistoryModal } from '../history-modal';

const notAvailable = 'No price available for the selected ticker';

interface ILatestDataTable {
  pair: string;
}

export const LatestDataTable = ({ pair }: ILatestDataTable) => {
  const binanceQuery = useBinancePrice(pair);
  const bitfinexQuery = useBitfinexPrice(pair);
  const huobiQuery = useHuobiPrice(pair);
  const krakenQuery = useKrakenPrice(pair);
  const [market, setMarket] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const binanceData = binanceQuery?.data?.price;
  const bitfinexData = bitfinexQuery.data && bitfinexQuery.data[0];
  const huobiData = huobiQuery.data?.tick?.open;
  const krakenData =
    krakenQuery.data &&
    krakenQuery.data.result &&
    // @ts-ignore
    Object.values(krakenQuery?.data?.result)[0]?.c[0];

  useEffect(() => {
    binanceQuery.refetch();
    bitfinexQuery.refetch();
    huobiQuery.refetch();
    krakenQuery.refetch();
  }, [pair]);

  const handleRowClick = (market: string) => {
    setMarket(market);
    setModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              onClick={() => binanceData && handleRowClick('binance')}
              sx={{
                cursor: binanceData ? 'pointer' : 'not-allowed',
              }}
            >
              <TableCell component="th" scope="row">
                {Exchanges.BINANCE}
              </TableCell>
              <TableCell align="right">
                <DataWithLoader
                  isLoading={binanceQuery.isFetching}
                  data={binanceData || notAvailable}
                />
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => bitfinexData && handleRowClick('bitfinex')}
              sx={{
                cursor: bitfinexData ? 'pointer' : 'not-allowed',
              }}
            >
              <TableCell component="th" scope="row">
                {Exchanges.BITFINEX}
              </TableCell>
              <TableCell align="right">
                <DataWithLoader
                  isLoading={bitfinexQuery?.isFetching}
                  data={bitfinexData || notAvailable}
                />
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => huobiData && handleRowClick('huobi')}
              sx={{
                cursor: huobiData ? 'pointer' : 'not-allowed',
              }}
            >
              <TableCell component="th" scope="row">
                {Exchanges.HUOBI}
              </TableCell>
              <TableCell align="right">
                <DataWithLoader
                  isLoading={huobiQuery?.isFetching}
                  data={huobiData || notAvailable}
                />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                cursor: krakenData ? 'pointer' : 'not-allowed',
              }}
              onClick={() => krakenData && handleRowClick('kraken')}
            >
              <TableCell component="th" scope="row">
                {Exchanges.KRAKEN}
              </TableCell>
              <TableCell align="right">
                <DataWithLoader
                  isLoading={krakenQuery?.isFetching}
                  data={krakenData || notAvailable}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <HistoryModal
          open={isModalOpen}
          market={market}
          pair={pair}
          handleClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
