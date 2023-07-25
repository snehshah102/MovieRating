import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

const ReviewBody = ({ enteredReview, handleReviewChange }) => {
  const MAX_CHARACTERS = 200;

  const handleInputChange = (event) => {
    if (event.target.value.length <= MAX_CHARACTERS) {
      handleReviewChange(event);
    }
  };

  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Enter your review:
      </Typography>
      <TextField value={enteredReview} onChange={handleInputChange} fullWidth multiline inputProps={{ maxLength: MAX_CHARACTERS }} />
      <Typography variant="caption" color={enteredReview.length > MAX_CHARACTERS ? 'error' : 'textSecondary'}>
        {enteredReview.length}/{MAX_CHARACTERS} characters
      </Typography>
    </Grid>
  );
};

export default ReviewBody;