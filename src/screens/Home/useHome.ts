import { useEffect, useState } from 'react';
import movieInstance from '../../network/movieInstance';
import { UPCOMING_MOVIES } from '../../network/endpoints';
import { Movie } from '../../utils/types';

function useHome() {
  const [moviesList, setmoviesList] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getMoviesList = async (pageNumber: number) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const data = await movieInstance.get(
        UPCOMING_MOVIES + `?adult=false&page=${pageNumber ? pageNumber : 1}`,
      );
      const newMovies = data?.data?.results;
      const totalPages = data?.data?.total_pages;

      setmoviesList(prev => [...prev, ...newMovies]);
      setPage(pageNumber);
      setHasMore(pageNumber < totalPages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMoviesList(1);
  }, []);

  return {
    getMoviesList,
    moviesList,
    page,
    hasMore,
    isLoading,
  };
}

export default useHome;
