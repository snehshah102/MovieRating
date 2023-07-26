import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Search = () => {
  const [movieName, setMovieName] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [movieResults, setMovieResults] = useState('');

  useEffect(() => {
    callApisearchMovies()
      .then(res => {
        console.log("Deliverable 2: ", res)
        var parsed = JSON.parse(res.express);
        console.log("Deliverable 2: ", parsed);
        setMovieName(parsed);
      })
  }, []);

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

   
    callApisearchMovies()
      .then((res) => {
        console.log("Search Results: ", res);
        setMovieResults(res.express); 
      })
      .catch((error) => {
        console.error("Error while searching: ", error.message);
        setMovieResults(''); 
      });
  };

  const callApisearchMovies = async () => {
    let url = '/api/searchMovies';
    const searchBar = {
      movieName: movieName,
      actorName: actorName,
      directorName: directorName,
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
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="center">
          <TextField label="Movie Name" value={movieName} onChange={handleMovieNameChange} style={{ width: '75%', padding: '0.5rem' }}/>
          <TextField label="Actor Name" value={actorName} onChange={handleActorNameChange} style={{ width: '75%', padding: '0.5rem' }}/>
          <TextField label="Director Name" value={directorName} onChange={handleDirectorNameChange} style={{ width: '75%', padding: '0.5rem' }}/>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
      {/*Display Results*/}
      {movieResults && (
        <div>
          <h2>Search Results</h2>
          <pre>{movieResults}</pre>
        </div>
      )}
    </>
  );
};

export default Search;