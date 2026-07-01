import { create } from 'zustand';
import type { Movie } from '@/types/movie';

interface MovieStore {
  favorites: Movie[];

  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  favorites: [],

  addFavorite: (movie) =>
    set((state) => ({
      favorites: state.favorites.some((m) => m.id === movie.id)
        ? state.favorites
        : [...state.favorites, movie],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== id),
    })),

  isFavorite: (id) => get().favorites.some((movie: Movie) => movie.id === id),
}));
