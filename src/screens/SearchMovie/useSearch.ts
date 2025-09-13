import { useState } from 'react';
import { Movie } from '../../utils/types';
import movieInstance from '../../network/movieInstance';
import { SEARCH_MOVIE } from '../../network/endpoints';

interface Props {
  localCachedMovies: Movie[];
}

interface ApiResponse {
  results: Movie[];
  Error?: string;
}

const useMovieSearch = ({ localCachedMovies }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];

    setLoading(true);
    setError('');

    const cached = localCachedMovies.filter(movie =>
      movie.title?.toLowerCase().includes(query.toLowerCase()),
    );

    if (cached.length > 0) {
      setLoading(false);
      return cached;
    }
    try {
      const response = await movieInstance.get<ApiResponse>(
        `${SEARCH_MOVIE}${query}`,
      );
      const data = response.data;

      if (data?.results) {
        return data.results;
      } else {
        setError(data.Error || 'No results found.');
        return [];
      }
    } catch (err) {
      console.error('Movie search error:', err);
      setError('Something went wrong.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    searchMovies,
    loading,
    error,
  };
};

export default useMovieSearch;
