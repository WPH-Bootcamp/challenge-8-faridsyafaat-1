import { useState } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HeroBanner from '@/components/movie/HeroBanner';
import MovieSection from '@/components/movie/MovieSection';

import {
  useMovieDetails,
  useMovieVideos,
  useNowPlayingMovies,
  usePopularMovies,
  useSearchMovies,
} from '@/hooks/useMovies';

import { useDebounce } from '@/hooks/useDebounce';

import notFoundImage from '@/assets/images/notfound.png';

const HERO_MOVIE_ID = 950396;

function HomePage() {
  const [search, setSearch] = useState('');

  const keyword = useDebounce(search, 500);

  // Hero
  const { data: heroMovie, isLoading: heroLoading } =
    useMovieDetails(HERO_MOVIE_ID);

  const { data: heroVideos } = useMovieVideos(HERO_MOVIE_ID);

  // Trending
  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError,
  } = usePopularMovies();

  // New Release
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } =
    useNowPlayingMovies();

  // Search
  const { data: searchMovies, isLoading: searchLoading } =
    useSearchMovies(keyword);

  // Loading
  if (
    heroLoading ||
    popularLoading ||
    nowPlayingLoading ||
    (keyword && searchLoading)
  ) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Loading movies...
      </div>
    );
  }

  // Error
  if (popularError || !popularMovies || !heroMovie) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Failed to load movies.
      </div>
    );
  }

  return (
    <main className='flex min-h-screen flex-col overflow-x-hidden bg-black text-white'>
      <Navbar search={search} onSearch={setSearch} />

      {keyword ? (
        <div className='flex flex-1 flex-col pt-32'>
          {(searchMovies?.results.length ?? 0) > 0 ? (
            <MovieSection
              title={`Search Result (${searchMovies?.results.length})`}
              movies={searchMovies?.results ?? []}
              variant='grid'
            />
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center'>
              <img
                src={notFoundImage}
                alt='Not Found'
                className='mb-8 h-[180px] w-[180px] object-contain'
              />

              <h2 className='text-lg font-semibold text-white'>
                Data Not Found
              </h2>

              <p className='mt-2 text-sm text-[#7B8190]'>Try other keywords</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <HeroBanner movie={heroMovie} videos={heroVideos?.results ?? []} />

          <MovieSection
            title='Trending Now'
            movies={popularMovies.results}
            variant='trending'
          />

          <MovieSection
            title='New Release'
            movies={nowPlayingMovies?.results ?? []}
            variant='grid'
          />
        </>
      )}

      <Footer />
    </main>
  );
}

export default HomePage;
