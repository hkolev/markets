import { useState, useEffect } from 'react';

import { Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';

import { currencies } from '../../data/currencies';
import { pairs } from '../../data/pairs';
import { LatestDataTable } from '../../components/LatestDataTable';

export const Home = () => {
  const [baseAsset, setBaseAsset] = useState<string | null>('');
  const [secondaryAsset, setSecondaryAsset] = useState<string | ''>('');
  const [pair, setPair] = useState<string | ''>('');

  useEffect(() => {
    setPair(`${baseAsset}${secondaryAsset}`);
  }, [baseAsset, secondaryAsset]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} lg={6}>
          <Autocomplete
            disablePortal
            id="base-asset"
            options={currencies}
            value={baseAsset}
            onChange={(_, value: string | null) => {
              setBaseAsset(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Base asset" />
            )}
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <Autocomplete
            disablePortal
            id="secondary-asset"
            options={currencies}
            value={secondaryAsset}
            onChange={(_, value: string | null) => {
              setSecondaryAsset(value || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Secondary asset" />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Autocomplete
            disablePortal
            id="secondary-asset"
            options={pairs}
            value={pair}
            onChange={(_, value: string | null) => {
              setPair(value || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Predefined Pairs" />
            )}
            sx={{ marginBottom: '30px' }}
          />
          <>
            <Typography align="center" variant="h5">
              {pair === '' ? 'Please select a pair' : `Selected pair: ${pair}`}
            </Typography>

            {pair && <LatestDataTable pair={pair} />}
          </>
        </Grid>
      </Grid>
    </>
  );
};
