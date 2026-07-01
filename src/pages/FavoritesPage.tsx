import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FavoriteCard from '@/components/favorites/FavoriteCard';
import { useMovieStore } from '@/store/movieStore';
import emptyFrame from '@/assets/images/frame.png';

function FavoritesPage() {
  const { favorites } = useMovieStore();

  return (
    <main className='flex min-h-screen flex-col bg-[#090B10]'>
      <Navbar />

      <section className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-32 pb-24'>
        <h1 className='mb-12 text-3xl font-bold text-white lg:text-5xl'>
          Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center'>
            {/* Image */}
            <img
              src={emptyFrame}
              alt='Empty Favorite'
              className='mb-8 h-[200px] w-[200px] object-contain'
            />

            {/* Title */}
            <h2 className='text-xl font-semibold text-[#FFFFFF]'>Data Empty</h2>

            {/* Subtitle */}
            <p className='mt-3 text-center text-sm text-[#7B8190]'>
              You don't have a favorite movie yet
            </p>

            {/* Button */}
            <Link
              to='/'
              className='
                mt-8
                flex
                h-[52px]
                w-[300px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#961200]
                text-base
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#B51700]
              '
            >
              Explore Movie
            </Link>
          </div>
        ) : (
          <div className='space-y-8'>
            {favorites.map((movie) => (
              <FavoriteCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default FavoritesPage;
