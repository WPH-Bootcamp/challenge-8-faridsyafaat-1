import api from '@/lib/axios';
import type {
  Movie,
  MovieResponse,
  CreditsResponse,
  VideosResponse,
} from '@/types/movie';

export const movieService = {
  // Popular Movies
  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const response = await api.get<MovieResponse>('/movie/popular', {
      params: {
        page,
      },
    });

    return response.data;
  },

  // Now Playing Movies
  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    const response = await api.get<MovieResponse>('/movie/now_playing', {
      params: {
        page,
      },
    });

    return response.data;
  },

  // Movie Detail
  async getMovieDetails(id: number): Promise<Movie> {
    const response = await api.get<Movie>(`/movie/${id}`);

    return response.data;
  },

  // Movie Credits
  async getMovieCredits(id: number): Promise<CreditsResponse> {
    const response = await api.get<CreditsResponse>(`/movie/${id}/credits`);

    return response.data;
  },

  // Movie Videos
  async getMovieVideos(id: number): Promise<VideosResponse> {
    const response = await api.get<VideosResponse>(`/movie/${id}/videos`);

    return response.data;
  },

  // Similar Movies
  async getSimilarMovies(id: number): Promise<MovieResponse> {
    const response = await api.get<MovieResponse>(`/movie/${id}/similar`);

    return response.data;
  },

  // Search Movie
  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const response = await api.get<MovieResponse>('/search/movie', {
      params: {
        query,
        page,
      },
    });

    return response.data;
  },
};
