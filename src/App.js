import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w185';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = () => {
    axios
      .get(API_URL, {
        params: {
          api_key: API_KEY,
          query,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <div className="App">
      <div className="space-above-header"></div>
      <header>
        <h1>Movie Search</h1>
      </header>
      <main>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchMovies}>Search</button>
        </div>
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img
                src={IMG_BASE_URL + movie.poster_path}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p className="movie-release-date">Release Date: {movie.release_date}</p>
                <p>{movie.overview}</p>
                <p>
                  <span className="movie-rating">Rating: {movie.vote_average}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
