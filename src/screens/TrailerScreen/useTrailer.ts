// hooks/useMovieTrailer.ts
import { useEffect, useState } from 'react';
import movieInstance from '../../network/movieInstance';
import { MOVIES } from '../../network/endpoints';

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

const useMovieTrailer = (movieId: number) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchTrailer = async () => {
    try {
      const res = await movieInstance.get(`${MOVIES}/${movieId}/videos`);
      const videos: Video[] = res?.data?.results;

      const trailer = videos.find(
        v => v.site === 'YouTube' && v.type === 'Trailer',
      );

      if (trailer) setTrailerKey(trailer.key);
    } catch (e) {
      console.error('Failed to fetch trailer:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [movieId]);

  return { trailerKey, isLoading };
};

export default useMovieTrailer;
