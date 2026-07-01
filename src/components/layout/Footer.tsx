import { Link } from 'react-router-dom';

import logo from '@/assets/images/bxs_tv.png';

function Footer() {
  return (
    <footer className='mt-12 border-t border-[#252B37] bg-[#000000]'>
      <div className='mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt='Movie' className='h-6 w-6' />

          <span className='text-lg font-semibold text-[#FDFDFD]'>Movie</span>
        </Link>

        <p className='text-left text-sm text-[#6C727F]'>
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
}

export default Footer;
