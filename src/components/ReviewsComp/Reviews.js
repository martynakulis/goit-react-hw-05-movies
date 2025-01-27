import { useState, useEffect } from 'react';
import { getReviews } from 'components/services/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await getReviews(movieId);
        setReviews(reviewsData);
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
      <ul className={css.list}>
        {reviews.length > 0
          ? reviews.map(review => {
              return (
                <li key={review.id}>
                  <p>Author: {review.author}</p>
                  <p>{review.content}</p>
                </li>
              );
            })
          : "We don't have any reviews for this movie"}
        {isLoading && <Loader />}
        {error && 'An error occurred. Please try again'}
      </ul>
    </>
  );
};
export default Reviews;
