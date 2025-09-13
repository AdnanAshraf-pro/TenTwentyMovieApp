import { useState, useEffect } from 'react';
import movieInstance from '../../network/movieInstance';
import { MovieDetail } from '../../utils/types';
import { MOVIE_DETAILS } from '../../network/endpoints';

function useMovieDetail(movieId: string) {
  const [movieDetail, setmovieDetail] = useState<MovieDetail>();
  const [isMovieDetailLoading, setisMovieDetailLoading] = useState(false);

  const getMovieDetails = async () => {
    setisMovieDetailLoading(true);
    try {
      const data = await movieInstance.get(`${MOVIE_DETAILS}${movieId}`);
      setmovieDetail(data?.data ?? {});
      setisMovieDetailLoading(false);
    } catch (error) {
      setisMovieDetailLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    getMovieDetails,
    movieDetail,
    isMovieDetailLoading,
  };
}

export default useMovieDetail;
