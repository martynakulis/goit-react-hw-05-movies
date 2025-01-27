import axios from 'axios';

const API_KEY = '6c1d2f3606f516423c6d6ddbd7258cac';

export const getTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getMovies = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1'`
  );
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};
export const getCast = async movieID => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data.cast;
};

export const getReviews = async movieID => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};
