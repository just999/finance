'use client';

import Image from 'next/image';
import { loremText } from '../analytics-feature/analytics-feature';

type HeroProps = unknown;

const Hero = () => {
  return (
    <div className='h-screen w-full bg-[#f7f6fb] pt-[1vh] dark:bg-slate-800 dark:text-slate-100 md:pt-[4vh]'>
      <div className='mx-auto flex h-full w-[90%] flex-col justify-center sm:w-[80%]'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div>
            <div className='flex w-fit items-center space-x-3 rounded-full bg-white px-2 py-1.5 shadow-md dark:bg-slate-600 md:px-5'>
              <div className='rounded-full bg-blue-700 px-3 py-1 text-xs text-white sm:text-sm md:px-5 md:py-1 md:text-base'>
                News
              </div>
              <p className='text-xs dark:text-slate-200 sm:text-sm'>
                We have updated our term & condition policy
              </p>
            </div>
            <h1
              data-aos='fade-up'
              className='mb-6 mt-6 text-2xl font-bold sm:text-4xl md:text-5xl md:leading-[3.5rem]'
            >
              The premier Finance companion for you daily needs
            </h1>
            <p className='text-gray-600 dark:text-slate-100'>{loremText}</p>
            <div className='mb-8 mt-8 flex items-center space-x-4'>
              <Image
                src='/images/gp.png'
                alt='play-store'
                width={150}
                height={150}
                className='object-contain'
              />
              <Image
                src='/images/as.png'
                alt='app-store'
                width={150}
                height={150}
                className='object-contain'
              />
            </div>
          </div>
          <div
            data-aos='fade-up'
            data-aos-delay='200'
            className='hidden lg:block'
          >
            <Image
              src='/images/economics-hero.svg'
              alt='hero'
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
