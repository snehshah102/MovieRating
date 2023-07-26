import React, { useState, useEffect } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API to search for movies using the entered criteria
    callApisearchMovies()
      .then((res) => {
        console.log("Results: ", res);
        
        setMovieResults(JSON.parse(res.express)); // Set the search results to state
      })
  };

  const callApisearchMovies = async () => {
    let url = '/api/searchMovies';
    const searchBar = {
      movieName: movieName,
      actorName: actorName,
      directorName: directorName
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchBar)
    });

    const frame = await response.json();
    if (response.status !== 200) throw Error(frame.message);
    return frame;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Navigation Bar
          </Typography>
          <Button component={Link} to="/" color="inherit">Landing</Button>
          <Button component={Link} to="/search" color="inherit">Search</Button>
          <Button component={Link} to="/review" color="inherit">Review</Button>
          <Button component={Link} to="/mypage" color="inherit">My Page</Button>
        </Toolbar>
      </AppBar>
  
        <Stack spacing={2} alignItems="center">
          <TextField label="Movie Name" value={movieName} onChange={handleMovieNameChange} style={{ width: '75%', padding: '0.5rem' }} />
          <TextField label="Actor Name" value={actorName} onChange={handleActorNameChange} style={{ width: '75%', padding: '0.5rem' }} />
          <TextField label="Director Name" value={directorName} onChange={handleDirectorNameChange} style={{ width: '75%', padding: '0.5rem' }} />
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
        <Box p={4}>
        <Grid container justifyContent="center" spacing={3}>
          {movieResults?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 8 }}>
                <h2>Movie Name: {movie.movie_title}</h2>
                <h2>Director Name: {movie.director_names}</h2>
                <h2>Reviews: {movie.review_contents}</h2> 
                <h2>Average Score: {movie.average_rating}</h2>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Search;