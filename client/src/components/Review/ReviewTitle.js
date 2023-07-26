import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

const ReviewTitle = ({ enteredTitle, handleTitleChange }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Enter your review title:
      </Typography>
      <TextField value={enteredTitle} onChange={handleTitleChange} fullWidth/>
    </Grid>
  );
};

export default ReviewTitle;