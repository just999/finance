import { navLinks } from '@/lib/helpers';
import { X } from 'lucide-react';
import Link from 'next/link';

type MobileNavProps = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: MobileNavProps) => {
  const navOpen = showNav ? 'translate-x-0' : 'translate-x-[-100%]';
  return (
    <div>
      <div
        className={`fixed ${navOpen} inset-0 z-[10000] h-screen w-full transform bg-black opacity-70 transition-all duration-500`}
      ></div>

      <div
        className={`fixed ${navOpen} z-[10006] flex h-full w-[80%] transform flex-col justify-center space-y-6 bg-indigo-900 text-white transition-all delay-300 duration-500 sm:w-[60%]`}
      >
        {navLinks.map((link) => (
          <Link href={link.url} key={link.id}>
            <p className='nav__link ml-12 border-b-[1.5px] border-white pb-1 text-base text-white sm:text-3xl'>
              {link.label}
            </p>
          </Link>
        ))}
        <X
          onClick={closeNav}
          className='absolute right-[1.4rem] top-[.7rem] h-6 w-6 sm:h-8 sm:w-8'
        />
      </div>
    </div>
  );
};

export default MobileNav;
