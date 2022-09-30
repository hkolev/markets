import { Grid, Typography } from '@material-ui/core';

import { pairs } from '../../data/pairs';
import { LatestDataTable } from '../../components/LatestDataTable';
import { useParams } from 'react-router-dom';

export const Pair = () => {
  const { pair = '' } = useParams();

  return (
    <>
      {pairs.includes(pair) ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <>
                <Typography align="center" variant="h5">
                  {pair === ''
                    ? 'Please select a pair'
                    : `Selected pair: ${pair}`}
                </Typography>

                {pair && <LatestDataTable pair={pair} />}
              </>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography align="center" variant="h5">
          Cannot find combination {pair} in our database
        </Typography>
      )}
    </>
  );
};
