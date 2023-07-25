import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/loadUserSettings', (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = 'SELECT mode FROM s286shah.user WHERE userID = ?';
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });

  connection.end();
});

app.post('/api/getMovies', (req, res) => {

  let theResults;
  let connection = mysql.createConnection(config);
  let sql = 'SELECT * FROM movies';
  
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    theResults = results
    console.log(results);
    let string = JSON.stringify(theResults);
    console.log(string);
    res.send({express : string});
  });
  connection.end();
});

app.post('/api/addReview', (req, res) => {

  let connection = mysql.createConnection(config);
  let reviewData = req.body;
  let sql =
    'INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';
  let data = [
    reviewData.movieID,
    reviewData.userID,
    reviewData.reviewTitle,
    reviewData.reviewContent,
    reviewData.reviewScore
  ];

  connection.query(sql, data, (error, results) => {
    if (error) {
      res.send({express : error});
    }
    let string = JSON.stringify(results);
    res.send({express : string});
  });

  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;