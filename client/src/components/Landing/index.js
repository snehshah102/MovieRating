import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
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
    </>
  );
};

export default Landing;