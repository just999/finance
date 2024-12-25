'use client';

import { Quote, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import { loremText } from '../analytics-feature/analytics-feature';
import { lorem } from '../why-choose/why-choose-card';

type ReviewCardProps = {
  name: string;
  image: string;
  rating?: number;
  position?: string;
};

const ReviewCard = ({ name, image, position, rating = 5 }: ReviewCardProps) => {
  const renderStar = (pos: number) => {
    const difference = rating - (pos - 1);

    if (difference >= 1) {
      return <Star className='h-6 w-6 fill-yellow-600 text-yellow-600' />;
    } else if (difference >= 0.5) {
      return <StarHalf className='h-6 w-6 text-yellow-600' />;
    } else {
      return <Star className='h-6 w-6 text-yellow-600' />;
    }
  };

  return (
    <div className='relative mx-auto w-full rounded-lg bg-white p-6 shadow-lg dark:bg-slate-600 dark:text-slate-200 lg:w-[90%]'>
      <div>
        <Quote className='absolute top-8 h-14 w-14 opacity-10' />
      </div>
      <div className='grid grid-cols-1 items-center gap-6 lg:grid-cols-5'>
        <div className='order-2 col-span-3 lg:order-1'>
          <p className='mt-8 text-sm font-medium leading-[1.5rem] sm:text-base sm:leading-[1.8rem] md:text-lg md:leading-[2.5rem]'>
            {loremText}
            {lorem}
          </p>
          <div className='mt-6 flex items-center'>
            {[1, 2, 3, 4, 5].map((pos) => (
              <span key={pos}>{renderStar(pos)}</span>
            ))}
          </div>
          <h1 className='mt-8 text-xl font-bold'>{name}</h1>
          <p className='mb-6 mt-2 text-lg font-medium text-gray-600'>
            {position}
          </p>
        </div>
        <div className='order-1 col-span-2 mx-auto lg:order-2'>
          <Image
            src={image}
            alt={name}
            width={250}
            height={120}
            className='rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
