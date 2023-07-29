import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Stack, Grid, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Search = () => {
  const [movieName, setMovieName] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [movieResults, setMovieResults] = useState([]);

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleActorNameChange = (event) => {
    setActorName(event.target.value);
  };

  const handleDirectorNameChange = (event) => {
    setDirectorName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const searchBar = {
        movieName: movieName,
        actorName: actorName,
        directorName: directorName
      };

      const response = await fetch('/api/searchMovies', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchBar)
      });

      const data = await response.json();
      setMovieResults(data.express);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">Landing</Button>
          <Button component={Link} to="/search" color="inherit">Search</Button>
          <Button component={Link} to="/review" color="inherit">Review</Button>
          <Button component={Link} to="/mypage" color="inherit">My Page</Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box p={3} boxShadow={6} borderRadius={12} bgcolor="white" width="75%">
          <Typography variant="h4" align="center" gutterBottom>
            Search Movie
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems="center">
              <TextField label="Movie Name" value={movieName} onChange={handleMovieNameChange} style={{ width: '100%' }} />
              <TextField label="Actor Name" value={actorName} onChange={handleActorNameChange} style={{ width: '100%' }} />
              <TextField label="Director Name" value={directorName} onChange={handleDirectorNameChange} style={{ width: '100%' }} />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      <Box p={4} display="flex" justifyContent="center">
        <Grid container justifyContent="center" spacing={3}>
          {movieResults?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 8 }}>
                <Typography variant="h6" gutterBottom>
                  Movie Name: {movie.movie_title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Director Name: {movie.director_names}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Reviews: {movie.review_contents}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Average Score: {movie.average_rating}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Search;