import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

import type { Movie, Video } from '@/types/movie';

import heroDesktop from '@/assets/images/sectionhero-desktop.png';
import heroMobile from '@/assets/images/sectionhero-mobile.png';

interface HeroBannerProps {
  movie: Movie;
  videos: Video[];
}

function HeroBanner({ movie, videos }: HeroBannerProps) {
  const trailer =
    videos.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    ) ?? videos.find((video) => video.site === 'YouTube');

  return (
    <section className='relative h-[560px] overflow-hidden md:h-[650px] lg:h-[810px]'>
      {/* Desktop Background */}
      <img
        src={heroDesktop}
        alt='Hero Desktop'
        className='absolute inset-0 hidden h-full w-full object-cover lg:block'
      />

      {/* Mobile Background */}
      <img
        src={heroMobile}
        alt='Hero Mobile'
        className='absolute inset-0 block h-full w-full object-cover lg:hidden'
      />

      {/* Overlay */}
      <div
        className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black bg-gradient-to-r lg:from-black
        lg:via-black/65 lg:to-transparent'
      />

      {/* Content */}
      <div className='relative z-10 flex h-full items-end lg:items-center'>
        <div className='mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8 lg:pb-0'>
          <div className='max-w-[560px] text-white'>
            {/* Title */}
            <h1 className='mb-5 text-[40px] font-bold leading-tight lg:text-[56px]'>
              The Gorge
            </h1>

            {/* Overview */}
            <p className='mb-10 text-sm leading-7 text-[#A4A7AE] lg:text-base'>
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className='flex flex-col gap-4 sm:flex-row'>
              {/* Watch Trailer */}
              <button
                onClick={() => {
                  if (trailer) {
                    window.open(
                      `https://www.youtube.com/watch?v=${trailer.key}`,
                      '_blank'
                    );
                  }
                }}
                className='flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#961200] px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B11D08] hover:shadow-lg sm:w-[220px]'
              >
                <span>Watch Trailer</span>

                <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <Play
                    size={16}
                    className='ml-[2px] fill-[#961200] text-[#961200]'
                  />
                </span>
              </button>

              {/* Detail */}
              <Link
                to={`/movie/${movie.id}`}
                className='flex h-14 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black sm:w-[220px]'
              >
                See Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
