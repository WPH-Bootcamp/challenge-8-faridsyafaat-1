import { Heart, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { Movie } from '@/types/movie';
import { useMovieStore } from '@/store/movieStore';
import { movieService } from '@/services/movieService';

interface FavoriteCardProps {
  movie: Movie;
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function FavoriteCard({ movie }: FavoriteCardProps) {
  const navigate = useNavigate();

  const { removeFavorite } = useMovieStore();

  const handleWatchTrailer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const videos = await movieService.getMovieVideos(movie.id);

      const trailer =
        videos.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        ) ?? videos.results.find((video) => video.site === 'YouTube');

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      } else {
        alert('Trailer tidak tersedia.');
      }
    } catch {
      alert('Gagal mengambil trailer.');
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFavorite(movie.id);
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className='
        cursor-pointer
        rounded-3xl
        border
        border-[#252B37]
        bg-[#111827]
        p-5
        lg:p-6
      '
    >
      <div className='flex gap-5 lg:gap-8'>
        {/* Poster */}
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          className='
            h-[180px]
            w-[120px]
            shrink-0
            rounded-2xl
            object-cover
            lg:h-[220px]
            lg:w-[150px]
          '
        />

        {/* Content */}
        <div className='flex flex-1 flex-col'>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-white lg:text-2xl'>
                {movie.title}
              </h2>

              <div className='mt-3 flex items-center gap-2'>
                <Star size={16} className='fill-yellow-400 text-yellow-400' />

                <span className='text-[#A4A7AE]'>
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>

            {/* Heart Desktop */}
            <button
              onClick={handleRemoveFavorite}
              className='
                hidden
                lg:flex
                h-[52px]
                w-[52px]
                items-center
                cursor-pointer
                justify-center
                rounded-full
                bg-[#181D27]
                transition
                hover:bg-[#252B37]
              '
            >
              <Heart size={18} className='fill-[#961200] text-[#961200]' />
            </button>
          </div>

          {/* Overview */}
          <p className='mt-5 line-clamp-3 text-sm leading-7 text-[#A4A7AE] lg:text-base lg:leading-8'>
            {movie.overview}
          </p>

          {/* Desktop Action */}
          <div className='mt-8 hidden lg:flex items-center justify-between'>
            <button
              onClick={handleWatchTrailer}
              className='
                flex
                h-[48px]
                w-[180px]
                items-center
                justify-center
                gap-3
                cursor-pointer
                rounded-full
                bg-[#961200]
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#B51700]
              '
            >
              <span>Watch Trailer</span>

              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                <Play
                  size={14}
                  fill='#961200'
                  color='#961200'
                  strokeWidth={1.5}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Action */}
      <div className='mt-6 flex items-center gap-4 lg:hidden'>
        <button
          onClick={handleWatchTrailer}
          className='
            flex
            h-[52px]
            flex-1
            items-center
            justify-center
            cursor-pointer
            gap-3
            rounded-full
            bg-[#961200]
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#B51700]
          '
        >
          <span>Watch Trailer</span>

          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-white'>
            <Play
              size={14}
              className='ml-[2px] fill-[#961200] text-[#961200]'
            />
          </span>
        </button>

        <button
          onClick={handleRemoveFavorite}
          className='
            flex
            h-[52px]
            w-[52px]
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-[#181D27]
            transition
            hover:bg-[#252B37]
          '
        >
          <Heart size={18} className='fill-[#961200] text-[#961200]' />
        </button>
      </div>
    </div>
  );
}

export default FavoriteCard;
