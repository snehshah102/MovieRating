import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movie trailers from the backend API
    fetch('/api/getTrailers')
      .then((response) => response.json())
      .then((data) => {
        setTrailers(data.express);
      })
      .catch((error) => {
        console.error('Error fetching movie trailers:', error);
      });
  }, []);

  const handleMovieChange = (event) => {
    const selectedId = event.target.value;
    const selectedMovie = trailers.find((movie) => movie.id === selectedId);
    setSelectedMovie(selectedMovie);
  };

  const handleWatchOnYouTube = () => {
    if (selectedMovie) {
      window.open(selectedMovie.embedUrl, '_blank');
    }
  };

  const handleClearSearch = () => {
    setSelectedMovie(null);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box p={3} boxShadow={6} borderRadius={12} bgcolor="white" width="75%">
          <Typography variant="h4" align="center" gutterBottom>
            Movie Trailers
          </Typography>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select a movie</InputLabel>
            <Select value={selectedMovie ? selectedMovie.id : ''} onChange={handleMovieChange} label="Select a movie">
              {trailers.map((movie) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedMovie && (
            <>
              <Typography variant="h5" align="center" gutterBottom>
                {selectedMovie.title}
              </Typography>
              <Box display="flex" justifyContent="center" mb={3}>
                <iframe width="560" height="315" src={selectedMovie.embedUrl} title={selectedMovie.title} allowFullScreen ></iframe>
              </Box>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button variant="contained" color="primary" onClick={handleWatchOnYouTube}>
                  Watch on YouTube
                </Button>
                <Button variant="contained" color="primary" onClick={handleClearSearch}>
                  Clear Search
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyPage;