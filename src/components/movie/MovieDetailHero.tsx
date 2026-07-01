import { Heart, Play, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

import type { Movie, Video } from '@/types/movie';
import { formatDate } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';

import starIcon from '@/assets/images/star.png';
import videoIcon from '@/assets/images/video.png';
import happyIcon from '@/assets/images/happy.png';

interface MovieDetailHeroProps {
  movie: Movie;
  videos: Video[];
}

const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailHero({ movie, videos }: MovieDetailHeroProps) {
  const { addFavorite, removeFavorite, isFavorite } = useMovieStore();

  const favorite = isFavorite(movie.id);

  const trailer =
    videos.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    ) ?? videos.find((video) => video.site === 'YouTube');

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
      toast.success('Success Remove Favorite');
    } else {
      addFavorite(movie);
      toast.success('Success Add to Favorites');
    }
  };

  const handleWatchTrailer = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    } else {
      toast.error('Trailer tidak tersedia.');
    }
  };

  return (
    <section className='relative overflow-hidden'>
      {/* Backdrop */}
      <img
        src={`${BACKDROP_URL}${movie.backdrop_path}`}
        alt={movie.title}
        className='absolute inset-0 h-full w-full object-cover'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/75 backdrop-blur-[2px]' />

      {/* Content */}
      <div className='relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8'>
        <div className='flex flex-col gap-10 lg:flex-row'>
          {/* Poster */}
          <div className='mx-auto shrink-0 lg:mx-0'>
            <img
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.title}
              className='h-[300px] w-[210px] rounded-2xl object-cover shadow-2xl lg:h-[420px] lg:w-[280px]'
            />
          </div>

          {/* Right */}
          <div className='flex flex-1 flex-col text-white'>
            {/* Title */}
            <h1 className='text-3xl font-bold leading-tight lg:text-5xl'>
              {movie.title}
            </h1>

            {/* Release Date */}
            <div className='mt-4 flex items-center gap-2 text-[#A4A7AE]'>
              <Calendar size={16} />

              <span>{formatDate(movie.release_date)}</span>
            </div>

            {/* Trailer + Favorite */}
            <div className='mt-6 flex w-full items-center gap-4'>
              <button
                onClick={handleWatchTrailer}
                className='flex h-11 flex-1 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#961200] px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B51700] lg:flex-none lg:w-[220px]'
              >
                <span>Watch Trailer</span>

                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                  <Play
                    size={14}
                    fill='#961200'
                    color='#961200'
                    className='ml-[2px]'
                  />
                </span>
              </button>

              <button
                onClick={handleFavorite}
                className='flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#181D27] transition-all duration-300 hover:bg-[#252B37]'
              >
                <Heart
                  size={18}
                  className={
                    favorite
                      ? 'fill-[#961200] text-[#961200]'
                      : 'text-[#961200]'
                  }
                />
              </button>
            </div>

            {/* Info Cards */}
            <div className='mt-8 grid grid-cols-3 gap-4'>
              {/* Rating */}
              <div className='flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-[#252B37] bg-[#111827]/80 p-5 text-center'>
                <img
                  src={starIcon}
                  alt='Rating'
                  className='h-8 w-8 object-contain'
                />

                <p className='mt-4 text-sm text-[#A4A7AE]'>Rating</p>

                <h3 className='mt-3 text-2xl font-semibold text-[#FDFDFD]'>
                  {movie.vote_average.toFixed(1)}/10
                </h3>
              </div>

              {/* Genre */}
              <div className='flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-[#252B37] bg-[#111827]/80 p-5 text-center'>
                <img
                  src={videoIcon}
                  alt='Genre'
                  className='h-8 w-8 object-contain'
                />

                <p className='mt-4 text-sm text-[#A4A7AE]'>Genre</p>

                <h3 className='mt-3 text-2xl font-semibold text-[#FDFDFD]'>
                  {movie.genres?.[0]?.name?.split(' ')[0] ?? '-'}
                </h3>
              </div>

              {/* Age Limit */}
              <div className='flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-[#252B37] bg-[#111827]/80 p-5 text-center'>
                <img
                  src={happyIcon}
                  alt='Age Limit'
                  className='h-8 w-8 object-contain'
                />

                <p className='mt-4 text-sm text-[#A4A7AE]'>Age Limit</p>

                <h3 className='mt-3 text-2xl font-semibold text-[#FDFDFD]'>
                  13
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailHero;
