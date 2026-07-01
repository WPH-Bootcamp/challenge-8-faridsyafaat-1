import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetailPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
]);
