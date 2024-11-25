import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovieRecommendations();
  }, []);

  const fetchMovieRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/movie_recommendations/api/recommendations/');
      setMovies(response.data);  // Assume the data is an array of movie objects
    } catch (error) {
      console.error('Failed to fetch movie recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-8 bg-[#000300] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Movie Recommendations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div key={movie.movie_id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p>{movie.tags}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
