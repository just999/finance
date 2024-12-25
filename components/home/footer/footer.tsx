import Logo from '@/components/assets/logo/logo';

import {
  footerAboutUs,
  footerContactInfoLinks,
  footerOurInformationLinks,
  socialMedia,
} from '@/lib/helpers';
import Link from 'next/link';
import { lorem } from '../why-choose/why-choose-card';

type FooterProps = unknown;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='bg-white py-10 dark:bg-slate-900 dark:text-slate-200'>
      <div className='mx-auto w-[90%] px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4'>
          <div>
            <h1 className='text-xl font-bold md:text-2xl'>
              <Logo className='svg fill-orange-600' />
            </h1>
            <p className='mt-4 w-[80%] text-sm font-medium leading-[2rem] text-gray-500'>
              {lorem}
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-800 underline dark:text-slate-400'>
              About Us
            </h3>
            <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'>
              {footerAboutUs.map((about) => (
                <li key={about.dir} className='flex items-center'>
                  {about.dir}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-800 underline dark:text-slate-400'>
              Our Information
            </h3>
            <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'>
              {footerOurInformationLinks.map((info) => (
                <li key={info.link} className='flex items-center'>
                  {info.link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-800 underline dark:text-slate-400'>
              Contact Info
            </h3>
            <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'>
              {footerContactInfoLinks.map(({ icon: Icon, link }) => (
                <li key={link} className='flex items-center gap-2'>
                  <Icon className='flex items-center' />
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-8 flex flex-col items-center justify-between border-t pt-8 text-sm text-gray-600 md:flex-row'>
          <p>Copyright &copy; {year} Cat. ALl rights reserved </p>
          <div className='mt-4 flex items-center space-x-4 md:mt-0'>
            <span>Social: </span>
            {socialMedia.map(({ icon: Icon, name }) => (
              <Link
                key={name}
                href='#'
                className='text-gray-500 hover:text-gray-800'
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
