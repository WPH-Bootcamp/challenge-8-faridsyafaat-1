// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

// TODO: Add movie properties based on TMDB API response
// Examples: id, title, overview, poster_path, etc.

// TODO: Add pagination properties
// Examples: page, results, total_pages, total_results

// TODO: Add more types as needed (Genre, Video, etc.)

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;

  vote_average: number;
  vote_count: number;
  popularity: number;

  genre_ids: number[];

  genres?: Genre[];

  runtime?: number;

  adult: boolean;

  original_language: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface CreditsResponse {
  cast: Cast[];
}

export interface VideosResponse {
  results: Video[];
}
