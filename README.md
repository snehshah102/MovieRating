[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11491824)
# Movie Rating Website

##Movie Database Web App - README

This project is a Movie Database Web Application built using Node.js, React, and MySQL. The application allows users to search for movies by various criteria such as title, actor, and director, view movie details, read and write reviews, and explore a dedicated user page for additional functionalities.

##Project Structure:

Server: The NodeJS backend is located in the node-react-app/server.js file. It handles requests from the frontend, interacts with the MySQL database, and retrieves necessary data.
Client: The React frontend consists of several components:
App: The main component of the application structure.
Landing, Search, Review, MyPage: These represent different pages within the app, each serving distinct purposes and functionalities.

##Components:

Landing Page: Provides an introduction to the movie app and includes a Material UI Appbar with links to other pages (Search, Review, MyPage).
Search Page: Allows users to search for movies by title, actor, or director using Material UI text fields. The results display movie details including reviews and average scores. It includes a Material UI Appbar with links to Landing, Review, and MyPage.
Review Page: Allows users to read and write reviews for movies. It replicates the functionality from D2, displaying movie details and enabling review submission. 
MyPage: A customized page for browsing movie trailers and viewing recommendations based on user reviews.

##Design and Styling:
The entire application adheres to visually consistent Material UI styling for a cohesive user experience. Styling guidelines and examples from Lecture_5-2 slides have been followed to maintain consistency throughout the app.

##Getting Started:
Installation: Clone the repository and navigate to node-react-app.
Dependencies: Run npm install to install required Node.js packages.
Database Setup: Set up a MySQL database and configure the connection in server.js.
Start Server: Run npm start to start the Node.js server.
Start Frontend: Navigate to client and run npm start to start the React frontend.
Browser: Access the application via http://localhost:3000 in your web browser.

##Additional Notes:
For MyPage functionalities requiring additional data, the database might contain limited samples of such data (e.g., a few movie trailer links or news articles). 

##Conclusion:
This Movie Database Web Application offers a user-friendly interface for searching movies, reading and writing reviews, and exploring additional movie-related functionalities. It employs React client-side routing, Node.js backend, MySQL database, and Material UI for a cohesive and visually appealing user experience.






