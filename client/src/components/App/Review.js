import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';

const Review = () => {
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const[userID, setUserID] = React.useState(1)

  // changed
  useEffect(() => {
    callApiLoadMovies()
    .then(res => {
      console.log("Deliverable 2: ", res)
      var parsed = JSON.parse(res.express);
      console.log("Deliverable 2: ", parsed);
      setMovies(parsed);
    })
  }, [])
  
  const callApiLoadMovies = async () => {
    const url = "/api/getMovies";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const frame = await response.json();
    if (response.status !== 200) throw Error(frame.message);
      console.log("User settings: ", frame);
      return frame;
  }

  const callApiAddReview = async () => {

    console.log(movies.find(movie => movie.id == selectedMovie))
    const movieID = movies.find(movie => movie.id == selectedMovie).id
    const review = {
      userID : userID,
      movieID : movieID,
      reviewTitle : enteredTitle,
      reviewScore : selectedRating,
      reviewContent: enteredReview
    }

    const url = "/api/addReview";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review)
    });

    const frame = await response.json();
    if (response.status !== 200) throw Error(frame.message);
      return frame;
  }
  //changed until
  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Resetting errors and submission flag
    setErrors({});
    setIsSubmitted(true);

    // Validation and error handling
    const formErrors = {};

    if (!selectedMovie) {
      formErrors.movieError = 'Please select a movie';
    }

    if (!enteredTitle) {
      formErrors.titleError = 'Please enter a review title';
    }

    if (!enteredReview) {
      formErrors.reviewError = 'Please enter a review';
    }

    if (!selectedRating) {
      formErrors.ratingError = 'Please select a rating';
    }

    const hasErrors = Object.keys(formErrors).length > 0;

    if (hasErrors) {
      setErrors(formErrors);
    } else {
      //changed
      const reviewData = {
        selectedMovie: selectedMovie,
        enteredTitle: enteredTitle,
        enteredReview: enteredReview,
        selectedRating: selectedRating,
      };
      console.log(reviewData);
      setSubmittedData(reviewData);
      setErrors({});
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      callApiAddReview()
      console.log(reviewData);

    }
    
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box p={3} boxShadow={6} borderRadius={12} bgcolor="white" width="75%">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom align="center">
              Review Movie App
            </Typography>
          </Grid>
          {/* Pass 3 props, populate movies, manage selected movie, and handle changes */}
          <MovieSelection movies={movies} selectedMovie={selectedMovie} handleMovieChange={handleMovieChange}
          />
          {/* If the error property is not empty and has an error message, it will be displayed in the Typography component */}
          {isSubmitted && errors.movieError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {errors.movieError}
              </Typography>
            </Grid>
          )}
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />
          {isSubmitted && errors.titleError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {errors.titleError}
              </Typography>
            </Grid>
          )}
          <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />
          {isSubmitted && errors.reviewError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {errors.reviewError}
              </Typography>
            </Grid>
          )}
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange}
          />
          {isSubmitted && errors.ratingError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {errors.ratingError}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth >
              Submit
            </Button>
          </Grid>
          {isSubmitted && !Object.keys(errors).length > 0 && (
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="body1" gutterBottom align="center">
                  Congrats! Your review has been received:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Movie: {submittedData.selectedMovie}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Title: {submittedData.enteredTitle}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Review: {submittedData.enteredReview}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Rating: {submittedData.selectedRating}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Review;