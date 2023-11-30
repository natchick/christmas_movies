import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovies, addMovie } from './apiService';
const cors = require("cors");

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);


  useEffect(() => {
    
    getMovies()
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []); 
  console.log(movies)


  const handleDelete = (id) => {
    fetch(`http://localhost:8081/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(() => {
        getMovies().then((data) => setMovies(data));
      })
      .catch((error) => console.error('Error deleting movie:', error));
  };

  const handleAddMovie = () => {
    addMovie({ title: newMovieTitle, year: newMovieYear })
      .then(() => {
        // After successful addition, fetch updated movie list
        getMovies().then((data) => setMovies(data));
        setNewMovieTitle('');
        setNewMovieYear('');
      })
      .catch((error) => console.error('Error adding movie:', error));
  };



  const handleUpdateTitle = () => {
    if (selectedMovieId) {
      fetch(`http://localhost:8081/movies/${selectedMovieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response not ok');
          }
          return response.json();
        })
        .then(() => {
          getMovies().then((data) => setMovies(data));
          setUpdatedTitle('');
          setSelectedMovieId(null);
        })
        .catch((error) => console.error('Error updating movie title:', error));
    }
  };

  return (
    <div className="App">
      <div className="movies-list">
        <h1>Movies</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <span className="year">{movie.year}</span>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-movie-section">
        <h2>Add Movie</h2>
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="New Movie Title"
        />
        <input
          type="text"
          value={newMovieYear}
          onChange={(e) => setNewMovieYear(e.target.value)}
          placeholder="New Movie Year"
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div className="update-section">
        <h2>Update Movie Title</h2>
        <select
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
        >
          <option value="" disabled>Select Movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>{movie.title}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="New Title"
        />
        <button onClick={handleUpdateTitle}>Update Title</button>
      </div>
    </div>
  );
};

export default App;