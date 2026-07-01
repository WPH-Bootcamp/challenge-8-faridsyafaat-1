import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/lib/constants';
import { movieService } from '@/services/movieService';

// Popular Movies
export const usePopularMovies = (page: number = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => movieService.getPopularMovies(page),
  });

// Now Playing Movies
export const useNowPlayingMovies = (page: number = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => movieService.getNowPlayingMovies(page),
  });

// Movie Detail
export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.details(id),
    queryFn: () => movieService.getMovieDetails(id),
    enabled: Number.isFinite(id),
  });

// Movie Credits
export const useMovieCredits = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.credits(id),
    queryFn: () => movieService.getMovieCredits(id),
    enabled: Number.isFinite(id),
  });

// Movie Videos
export const useMovieVideos = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.videos(id),
    queryFn: () => movieService.getMovieVideos(id),
    enabled: Number.isFinite(id),
  });

// Similar Movies
export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.similar(id),
    queryFn: () => movieService.getSimilarMovies(id),
    enabled: Number.isFinite(id),
  });

// Search Movie
export const useSearchMovies = (query: string, page: number = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn: () => movieService.searchMovies(query, page),
    enabled: query.trim().length > 0,
  });
