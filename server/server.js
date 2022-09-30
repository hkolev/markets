const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 9000;
const app = express();

const BlockchainsAPIs = {
  BINANCE: 'https://api.binance.com/api/v3',
  BITFINEX: 'https://api-pub.bitfinex.com/v2',
  HUOBI: 'https://api.huobi.pro',
  KRAKEN: 'https://api.kraken.com/',
}

app.use(
  cors({
    origin: '*',
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const errorHandler = (error) => {
  return {
    error: {
      message: error.message,
      code: error.code,
      status: error.status,
    },
    message: 'Something terrible happend',
    ok: false,
  };
};

app.get('/binance/*', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${BlockchainsAPIs.BINANCE}${req.url.replace('/binance', '')}`
    );
    return res.send(data);
  } catch (error) {
    return res.send(errorHandler(error));
  }
});

app.get('/bitfinex/*', async (req, res) => {
  const url = `${BlockchainsAPIs.BITFINEX}${req.url.replace('/bitfinex', '')}`;
  try {
    const { data } = await axios.get(url);
    return res.send(data);
  } catch (error) {
    return res.send(errorHandler(error));
  }
});

app.get('/huobi/market*', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${BlockchainsAPIs.HUOBI}${req.url.replace('/huobi', '')}`
    );
    return res.send(data);
  } catch (error) {
    return res.send(errorHandler(error));
  }
});

app.get('/kraken/*', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.kraken.com/0/public${req.url.replace('/kraken', '')}`
    );

    return res.send(data);
  } catch (error) {
    return res.send(errorHandler(error));
  }
});
