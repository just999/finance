'use client';

import { Button } from '@/components/ui/button';
import { analyticsFeature } from '@/lib/helpers';
import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';

type AnalyticsFeatureProps = unknown;

/* cSpell:disable */
export const loremText =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, iusto beatae? Sint recusandae, sunt doloribus modi illum quibusdam ullam possimus.';
/* cSpell:enable */
const AnalyticsFeature = () => {
  return (
    <div className='pb-16 pt-24 dark:bg-slate-900 dark:text-slate-100'>
      <div className='mx-auto grid w-[95%] grid-cols-1 items-center gap-10 sm:w-[80%] lg:grid-cols-2'>
        <div data-aos='fade-up' data-aos-anchor-placement='top-center'>
          <Image
            src='/images/a.jpg'
            alt='image'
            width={500}
            height={500}
            className='object-contain'
          />
        </div>
        <div className='p-6'>
          <h1 className='text-base font-semibold text-orange-500'>
            Audience tracking and insights
          </h1>
          <h1 className='mt-4 to-gray-900 text-xl font-bold sm:text-2xl md:text-3xl'>
            Powerful analytics tools that put you in control and are fully
            customizable
          </h1>
          <p className='mt-4 to-gray-600 text-sm font-medium leading-[2rem] dark:text-slate-100'>
            {loremText}
          </p>
          <ul className='mt-7 space-y-2 text-gray-800 dark:text-slate-100'>
            {analyticsFeature.map((feature) => (
              <li
                className='flex items-center font-semibold'
                key={feature.content}
              >
                <CircleCheckBig className='mr-2 text-emerald-500' />
                {feature.content}
              </li>
            ))}
          </ul>
          <Button className='mt-8 rounded-full bg-gray-100 px-8 py-3 font-semibold text-gray-800 transition-all duration-200 hover:bg-blue-800 hover:text-white'>
            Explore More &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFeature;
