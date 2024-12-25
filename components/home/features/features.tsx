'use client';

import { features } from '@/lib/helpers';
import { cn } from '@/lib/utils';

type FeaturesProps = unknown;

const Features = () => {
  return (
    <div className='bg-pink-50 py-20 dark:bg-slate-950 dark:text-slate-200'>
      <div className='mx-auto w-[80%] text-center'>
        <h1 className='mt-6 text-center text-2xl font-bold capitalize md:text-3xl'>
          its Everything you will ever need
        </h1>
        <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f, i) => (
            <div
              data-aos='flip-right'
              data-aos-anchor-placement='top-center'
              data-aos-delay={cn(i * 100)}
              key={f.text}
              className='flex items-center justify-center space-x-3 rounded-lg bg-white p-4 shadow-md dark:bg-zinc-700'
            >
              <div className='flex h-14 w-14 flex-col items-center justify-center rounded-full border border-red-700 border-opacity-30 bg-red-800 bg-opacity-10 text-3xl'>
                <span>
                  <f.icon className={cn('svg', f.class)} />
                </span>
              </div>
              <span className='font-semibold'>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
