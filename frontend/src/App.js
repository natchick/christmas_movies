import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovies } from './apiService';
const cors = require("cors");

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    getMovies()
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []); 
  console.log(movies)

  return (
    <div className="App">
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
