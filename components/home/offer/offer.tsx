'use client';

import { Button } from '@/components/ui/button';

type OfferProps = unknown;

const Offer = () => {
  return (
    <div className='mb-20 flex items-center justify-center bg-black py-24 dark:bg-gray-900 dark:text-slate-200'>
      <div className='px-6 text-center'>
        <h2 className='mb-4 text-2xl font-semibold text-white md:text-3xl'>
          Explore ultimate feature with premium{' '}
        </h2>
        <p className='mb-8 text-gray-400'>
          Tell us your Apple Id email address so we could send you TestFlight
          invitation directly
        </p>
        <Button
          variant='ghost'
          className='mb-4 rounded-full bg-blue-500 px-8 py-3 text-lg font-medium text-white hover:bg-blue-600'
        >
          Start 14 days Free Trial
        </Button>
        <p className='text-gray-400'>No Credit Card Required</p>
      </div>
    </div>
  );
};

export default Offer;
