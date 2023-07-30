import React from 'react';
import {Grid, Typography, Radio, RadioGroup, FormControlLabel} from '@mui/material';

const ReviewRating = ({ selectedRating, handleRatingChange }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Select the rating:
      </Typography>
      <RadioGroup value={selectedRating} onChange={handleRatingChange} row>
        {[1, 2, 3, 4, 5].map((rating) => (
          <FormControlLabel key={rating} value={rating.toString()} control={<Radio />} label={rating.toString()} />
        ))}
      </RadioGroup>
    </Grid>
  );
};

export default ReviewRating;