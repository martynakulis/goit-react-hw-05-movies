import { useEffect, useState } from 'react';
import { getMovies } from 'components/services/api';
import Loader from 'components/Loader/Loader';
import { useSearchParams, Link } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        const movies = await getMovies(query);
        setMovies(movies);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.formButton}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && 'An error occurred. Please try again'}
      <ul>
        {movies.length > 0
          ? movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  state={{ from: `/movies/?${searchParams}` }}
                >
                  {movie.title}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};
export default Movies;
