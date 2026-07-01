import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className='group block shrink-0 w-[160px] transition-all duration-300 hover:-translate-y-2 lg:w-[216px]'
    >
      {/* Poster */}
      <div className='h-[240px] w-[160px] overflow-hidden rounded-2xl lg:h-[321px] lg:w-[216px]'>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : 'https://placehold.co/216x321/1A1A1A/FFFFFF?text=No+Image'
          }
          alt={movie.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      {/* Info */}
      <div className='mt-4 w-full'>
        <h3 className='truncate text-base font-semibold leading-6 text-white'>
          {movie.title}
        </h3>

        <div className='mt-2 flex items-center gap-1.5'>
          <Star size={14} className='fill-[#F4C430] text-[#F4C430]' />

          <span className='text-sm font-medium text-[#A4A7AE]'>
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
