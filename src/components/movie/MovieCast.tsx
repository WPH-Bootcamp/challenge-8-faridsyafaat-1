import type { Cast } from '@/types/movie';

interface MovieCastProps {
  cast: Cast[];
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w185';

function MovieCast({ cast }: MovieCastProps) {
  return (
    <section className='mx-auto mt-14 max-w-7xl px-6'>
      <h2 className='mb-8 text-[40px] font-bold leading-[48px] text-white'>
        Cast & Crew
      </h2>

      <div className='grid gap-y-8 gap-x-12 lg:grid-cols-3'>
        {cast.slice(0, 6).map((person) => (
          <div
            key={person.id}
            className='flex h-[104px] w-[360px] overflow-hidden rounded-lg'
          >
            <img
              src={
                person.profile_path
                  ? `${IMAGE_URL}${person.profile_path}`
                  : 'https://placehold.co/69x104?text=No+Image'
              }
              alt={person.name}
              className='h-[104px] w-[69px] object-cover'
            />

            <div className='flex flex-1 flex-col justify-center px-4'>
              <h3 className='text-[18px] font-semibold leading-7 text-white'>
                {person.name}
              </h3>

              <p className='mt-1 text-[14px] leading-6 text-[#A4A7AE]'>
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieCast;
