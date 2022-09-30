import { CircularProgress, Modal, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';

import { useBinanceOrderHistory } from '../../services/binance/useBinanceHistory';
import { useBitfinexHistory } from '../../services/bitfinex/useBitfinexHistory';
import { useHuobiHistory } from '../../services/huobi/useHuobiHistory';
import { useKrakenHistory } from '../../services/kraken/useKrakenHistory';
import { OrderTable } from '../order-table';

interface IHistoryModal {
  open: boolean;
  handleClose(): void;
  market: string;
  pair: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#1976d2',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  color: '#fff',
  maxHeight: 500,
};

export const HistoryModal = ({
  open,
  handleClose,
  market,
  pair,
}: IHistoryModal) => {
  const binanceHistoryResponse = useBinanceOrderHistory(pair);
  const bitfinexHistory = useBitfinexHistory(pair);
  const huobiHistory = useHuobiHistory(pair);
  const krakenHistory = useKrakenHistory(pair);

  const renderTable = () => {
    switch (market) {
      case 'binance':
        return (
          <>
            {binanceHistoryResponse.isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <OrderTable data={binanceHistoryResponse.data} />
            )}
          </>
        );
      case 'kraken':
        return (
          <>
            {krakenHistory.isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <OrderTable data={krakenHistory.data} />
            )}
          </>
        );
      case 'huobi':
        return (
          <>
            {huobiHistory.isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <OrderTable data={huobiHistory.data} />
            )}
          </>
        );
      case 'bitfinex':
        return (
          <>
            {bitfinexHistory.isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <OrderTable data={bitfinexHistory.data} />
            )}
          </>
        );
      default:
        return <Typography variant="h6">Not a valid market</Typography>;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          align="center"
          component="h2"
        >
          Prices for ticker {pair} on {market}
        </Typography>

        <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
          {renderTable()}
        </Box>
      </Box>
    </Modal>
  );
};
