import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from 'components/services/api';
import Loader from 'components/Loader/Loader';
import css from './Home.module.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        const trendingMovies = await getTrending();
        setTrending(trendingMovies);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <h1 className={css.homeTitle}>Trending today</h1>
      <ul>
        {trending.map(movie => {
          return (
            <li key={movie.id} className={css.homeLink}>
              <Link to={`movies/${movie.id}`} state={{ from: '/' }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
      {error && 'An error occurred. Please try again'}
    </>
  );
};

export default Home;
