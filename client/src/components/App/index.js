import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';
import Review from '../Review';

const App = () => {
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/review" element={<Review />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </Grid>
          
        </Grid>
      </div>
    </Router>
  );
};

export default App;
