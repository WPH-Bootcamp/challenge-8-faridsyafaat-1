import { useParams } from 'react-router-dom';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import MovieCast from '@/components/movie/MovieCast';
import MovieDetailHero from '@/components/movie/MovieDetailHero';

import {
  useMovieCredits,
  useMovieDetails,
  useMovieVideos,
} from '@/hooks/useMovies';

function MovieDetailPage() {
  const { id } = useParams();

  const movieId = Number(id);
  const isValidMovieId = !Number.isNaN(movieId);

  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  const { data: credits } = useMovieCredits(movieId);

  const { data: videos } = useMovieVideos(movieId);

  if (!isValidMovieId) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Invalid movie.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Loading Movie...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Movie not found.
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-[#090B10]'>
      <Navbar />

      <MovieDetailHero movie={movie} videos={videos?.results ?? []} />

      <section className='mx-auto max-w-7xl px-6 py-16'>
        <h2 className='mb-6 text-3xl font-bold text-white'>Overview</h2>

        <p className='max-w-4xl leading-8 text-[#A4A7AE]'>{movie.overview}</p>
      </section>

      <MovieCast cast={credits?.cast ?? []} />

      <Footer />
    </main>
  );
}

export default MovieDetailPage;
