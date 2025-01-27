import { useEffect, useState } from 'react';
import { getCast } from 'components/services/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        const castData = await getCast(movieId);
        setCast(castData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, [movieId]);

  return (
    <>
      <ul className={css.cast}>
        {cast.length > 0
          ? cast.map(actor => {
              return (
                <li key={actor.id}>
                  <img
                    className={css.actorImage}
                    src={
                      actor.profile_path &&
                      `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                    }
                    alt="actor"
                  ></img>
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </li>
              );
            })
          : null}
      </ul>
      {isLoading && <Loader />}
      {error && 'An error occurred. Please try again'}
    </>
  );
};
export default Cast;
