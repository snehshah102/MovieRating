import React from 'react';
import Review from './Review';
import { Grid } from '@mui/material';

const App = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Review />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;