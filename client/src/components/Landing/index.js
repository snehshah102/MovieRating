import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper, Container, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">Landing</Button>
          <Button component={Link} to="/search" color="inherit">Search</Button>
          <Button component={Link} to="/review" color="inherit">Review</Button>
          <Button component={Link} to="/mypage" color="inherit">My Page</Button>
        </Toolbar>
      </AppBar>
      <Box className="welcome-section">
        <Typography variant="h2" className="welcome-message" gutterBottom>
          Welcome to Movie Magic!
        </Typography>
        <Typography variant="h5" className="overview-text" gutterBottom>
          Your one-stop destination for movie trailers, reviews, and more!
        </Typography>
      </Box>
      <Container className="feature-cards" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card className="feature-card">
              <CardContent>
                <Typography variant="h5">Search Movie Reviews</Typography>
                <Typography variant="body1">
                  Use our powerful search feature to find reviews to your favourite movies! 
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/search" color="primary">Search A Movie Review</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="feature-card">
              <CardContent>
                <Typography variant="h5">Write Movie Reviews</Typography>
                <Typography variant="body1">
                  Share your thoughts by writing reviews for the movies you love. Let others know what you think about the latest releases!
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/review" color="primary">Write A Movie Review</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="feature-card">
              <CardContent>
                <Typography variant="h5">Watch Movie Trailers</Typography>
                <Typography variant="body1">
                Watch your favorite movies. Watch them directly on our site or head to YouTube for the full experience!
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/mypage" color="primary">Watch A Movie Trailer</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Landing;