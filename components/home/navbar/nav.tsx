'use client';

import Logo from '@/components/assets/logo/logo';
import { useEffect, useState } from 'react';

import LogoutButton from '@/app/(logged-in)/logout-button';
import { navLinks } from '@/lib/helpers';
import { AlignRight, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type NavProps = {
  openNav: () => void;
};

type UserSessionProps = {
  user: {
    email: string;
    id: string;
  };
};

const Nav = ({ openNav }: NavProps) => {
  const [navBg, setNavBg] = useState(false);

  const { data: session, status } = useSession();
  console.log('🚀 ~ Nav ~ status:', status);
  console.log('🚀 ~ Nav ~ session:', session);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <div
      className={`fixed ${navBg ? 'bg-white shadow-md' : 'fixed'} z-[1000] h-[12vh] w-full transition-all duration-200 dark:bg-slate-900 dark:text-slate-100`}
    >
      <div className='mx-auto flex h-full w-[90%] items-center justify-between xl:w-[80%]'>
        {/* <div className='mx-auto flex h-full w-[90%] items-center justify-between xl:w-[80%]'> */}
        <Link href='/'>
          <Logo className='svg fill-orange-600' />
          {/* <h1 className='flex items-center text-xl font-bold md:text-2xl'>
            <span className='text-3xl text-orange-700 md:text-4xl'>C</span>at
          </h1> */}
        </Link>
        <div className='hidden items-center space-x-10 lg:flex'>
          {navLinks.map((link) => (
            <Link href={link.url} key={link.id}>
              <p className='nav__link text-xs'>{link.label}</p>
            </Link>
          ))}
        </div>
        <div className='flex items-center space-x-4'>
          {status === 'loading' ? (
            <div className='flex animate-pulse gap-2 rounded-full bg-gray-200 px-6 py-2 md:px-8 md:py-2.5'>
              <Loader size={18} className='animate-spin' />
              Loading...
            </div>
          ) : status === 'unauthenticated' ? (
            <Link
              href='/register'
              // variant='ghost'
              className='rounded-full bg-blue-700 px-6 py-2 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-900 md:px-8 md:py-2.5'
            >
              Join Now
            </Link>
          ) : (
            <LogoutButton />
          )}

          <AlignRight
            onClick={openNav}
            className='h-8 w-8 cursor-pointer text-black lg:hidden'
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
