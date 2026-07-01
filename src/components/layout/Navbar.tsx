import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import logo from '@/assets/images/bxs_tv.png';

interface NavbarProps {
  search?: string;
  onSearch?: (value: string) => void;
}

function Navbar({ search = '', onSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0D12]/95 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8'>
          {/* Left */}
          <div className='flex items-center gap-10 lg:gap-24'>
            {/* Logo */}
            <Link to='/' className='flex items-center gap-3'>
              <img
                src={logo}
                alt='Movie Logo'
                className='h-7 w-7 object-contain'
              />

              <span className='text-[20px] font-semibold tracking-tight text-[#FDFDFD]'>
                Movie
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className='hidden items-center gap-16 lg:flex'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#961200]'
                      : 'text-white hover:text-[#961200]'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to='/favorites'
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#961200]'
                      : 'text-white hover:text-[#961200]'
                  }`
                }
              >
                Favorites
              </NavLink>
            </nav>
          </div>

          {/* Desktop Search */}
          <div className='hidden h-14 w-[290px] items-center rounded-2xl border border-[#252B37] bg-[#0A0D12]/60 px-5 backdrop-blur-md lg:flex'>
            <Search size={18} className='mr-3 text-[#717680]' />

            <input
              type='text'
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder='Search Movie'
              className='w-full bg-transparent text-sm text-white placeholder:text-[#717680] outline-none'
            />
          </div>

          {/* Mobile */}
          <div className='flex items-center gap-5 lg:hidden'>
            <Search size={22} className='cursor-pointer text-white' />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className='cursor-pointer text-white'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className='fixed left-0 top-20 z-40 w-full bg-[#0A0D12]/95 backdrop-blur-xl lg:hidden'
          >
            <nav className='flex flex-col px-6 py-4'>
              <NavLink
                to='/'
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 text-base ${
                    isActive ? 'text-[#961200]' : 'text-white'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to='/favorites'
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `py-4 text-base transition-colors ${
                    isActive
                      ? 'text-[#961200]'
                      : 'text-white hover:text-[#961200]'
                  }`
                }
              >
                Favorites
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
