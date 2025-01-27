import { useState, useEffect, Suspense } from 'react';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { getMovieDetails } from 'components/services/api';
import Loader from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  const { movieId } = useParams();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        const movieDetails = await getMovieDetails(movieId);
        setDetails(movieDetails);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, [movieId]);
  let year = new Date(details.release_date).getFullYear();
  console.log(year);

  return (
    <>
      <div className={css.goBack}>
        <Link to={backLinkHref}>
          <div>← Go back</div>
        </Link>
      </div>
      <div className={css.infoBox}>
        <img
          className={css.image}
          src={
            details.poster_path &&
            `https://image.tmdb.org/t/p/original/${details.poster_path}`
          }
          alt="movie poster"
        />
        <div className={css.info}>
          <h2>
            {details.title} - ({year})
          </h2>
          <p>User Score: {details.vote_average}</p>
          <h3>Overview</h3>
          <p>{details.overview}</p>
          <h3>Genres</h3>
          {details.genres
            ? details.genres.map(genre => (
                <span key={genre.id} className={css.genre}>
                  {genre.name}
                </span>
              ))
            : null}
        </div>
      </div>
      {isLoading && <Loader />}
      {error && 'An error occurred. Please try again'}
      <div className={css.otherInfo}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
};
export default MovieDetails;
