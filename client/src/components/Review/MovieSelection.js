import React from 'react';
import { Grid, Typography, Select, MenuItem } from '@mui/material';

const MovieSelection = ({ movies, selectedMovie, handleMovieChange }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Select a movie:
      </Typography>
      <Select value={selectedMovie} onChange={handleMovieChange} fullWidth >
        {movies?.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default MovieSelection;