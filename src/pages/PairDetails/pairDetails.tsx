import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { useBinanceOrderHistory } from '../../services/binance/useBinanceHistory';
import { useBitfinexHistory } from '../../services/bitfinex/useBitfinexHistory';
import { useHuobiHistory } from '../../services/huobi/useHuobiHistory';
import { useKrakenHistory } from '../../services/kraken/useKrakenHistory';
import { OrderTable } from '../../components/order-table';
import { pairs } from '../../data/pairs';
import { Exchanges } from '../../services/constants';
import { LatestDataTable } from '../../components/latest-datatable';

export const PairDetails = () => {
  const { pair = '' } = useParams();

  const binanceHistoryResponse = useBinanceOrderHistory(pair);
  const bitfinexHistory = useBitfinexHistory(pair);
  const huobiHistory = useHuobiHistory(pair);
  const krakenHistory = useKrakenHistory(pair);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <>
            <Typography align="center" variant="h5">
              Selected pair: {pair}
            </Typography>

            {pairs.includes(pair) ? (
              <LatestDataTable pair={pair} />
            ) : (
              <Typography align="center" variant="h5">
                Cannot find this combination in our database
              </Typography>
            )}
          </>
        </Grid>
      </Grid>

      {pairs.includes(pair) && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6" align="center" component="h6">
                {Exchanges.BINANCE}
              </Typography>
              {binanceHistoryResponse.isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <OrderTable data={binanceHistoryResponse.data} />
              )}
            </Grid>

            <Grid item xs={6} lg={6}>
              <Typography variant="h6" align="center" component="h6">
                {Exchanges.KRAKEN}
              </Typography>
              {krakenHistory.isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <OrderTable data={krakenHistory.data} />
              )}
            </Grid>

            <Grid item xs={6} lg={6}>
              <Typography variant="h6" align="center" component="h6">
                {Exchanges.HUOBI}
              </Typography>

              {huobiHistory.isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <OrderTable data={huobiHistory.data} />
              )}
            </Grid>

            <Grid item xs={6} lg={6}>
              <Typography variant="h6" align="center" component="h6">
                {Exchanges.BITFINEX}
              </Typography>

              {bitfinexHistory.isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <OrderTable data={bitfinexHistory.data} />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
