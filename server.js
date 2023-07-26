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

app.post('/api/searchMovies', (req, res) => {

  let movieName = req.body.movieName;
  let actorName = req.body.actorName;
  let directorName = req.body.directorName;

  let connection = mysql.createConnection(config);
  let sql = `SELECT m.name AS movie_title, d.director_names, a.actorName, r.review_contents, r.average_rating 
FROM movies m
JOIN (
  SELECT 
      movie_id, 
      GROUP_CONCAT(CONCAT(ac.first_name, ' ', ac.last_name)) AS actorName 
  FROM roles rl
  JOIN actors ac ON ac.id = rl.actor_id
  GROUP BY movie_id
  HAVING actorName LIKE '%${actorName}%'
) AS a ON m.id = a.movie_id
LEFT JOIN (
  SELECT 
      rw.movieID, 
      GROUP_CONCAT(rw.reviewContent) AS review_contents, 
      GROUP_CONCAT(rw.reviewScore) AS review_scores, 
      AVG(rw.reviewScore) AS average_rating 
  FROM Review rw
  GROUP BY rw.movieID
) AS r ON m.id = r.movieID
JOIN (
  SELECT 
      m.id, 
      m.name AS movie_title, 
      GROUP_CONCAT(CONCAT(d.first_name, ' ', d.last_name)) AS director_names 
  FROM directors d
  JOIN 
      movies_directors md ON md.director_id = d.id
  JOIN movies m ON m.id = md.movie_id
  GROUP BY 
      m.name, 
      m.id
  HAVING director_names LIKE '%${directorName}%'
) AS d ON d.id = m.id
WHERE m.name LIKE '%${movieName}%';`



  connection.query(sql, (error, results) => {
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

