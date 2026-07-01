import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import MovieCard from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  variant?: 'trending' | 'grid';
}

function MovieSection({
  title,
  movies,
  variant = 'trending',
}: MovieSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [visibleMovies, setVisibleMovies] = useState(5);

  const handleNext = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth * 0.9,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -(scrollRef.current.clientWidth * 0.9),
      behavior: 'smooth',
    });
  };

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 5);
  };

  return (
    <section className='mx-auto mt-20 max-w-7xl px-6'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='text-[36px] font-bold text-white'>{title}</h2>
      </div>

      {variant === 'trending' ? (
        <div className='relative'>
          {/* Prev */}
          <button
            onClick={handlePrev}
            className='
    hidden
    lg:flex
    absolute
    left-0
    top-1/2
    z-20
    h-12
    w-12
    cursor-pointer
    -translate-y-1/2
    items-center
    justify-center
    rounded-full
    bg-[#23242D]/90
    text-white
    shadow-xl
    transition-all
    duration-300
    hover:bg-[#961200]
  '
          >
            <ChevronLeft size={20} />
          </button>

          {/* Movies */}
          <div
            ref={scrollRef}
            className='
              flex
              gap-4
              overflow-x-auto
              overflow-y-hidden
              scroll-smooth
              scrollbar-hide
              lg:gap-6
            '
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <button
            onClick={handleNext}
            className='
    hidden
    lg:flex
    absolute
    right-0
    top-1/2
    z-20
    h-12
    w-12
    cursor-pointer
    -translate-y-1/2
    items-center
    justify-center
    rounded-full
    bg-[#23242D]/90
    text-white
    shadow-xl
    transition-all
    duration-300
    hover:bg-[#961200]
  '
          >
            <ChevronRight size={20} />
          </button>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className='grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 lg:grid-cols-5'>
            {movies.slice(0, visibleMovies).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Load More */}
          {visibleMovies < movies.length && (
            <div className='mt-14 flex justify-center'>
              <button
                onClick={handleLoadMore}
                className='cursor-pointer rounded-full border border-[#181D27] bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#172F5299] hover:shadow-lg'
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MovieSection;
