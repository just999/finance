'use client';

import { reviewCard } from '@/lib/helpers';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from './review-card';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

type ReviewsProps = unknown;

const Reviews = () => {
  return (
    <div className='bg-[#fcf6fa] py-16 dark:bg-slate-900 dark:text-slate-200'>
      <h1 className='mt-6 text-center text-2xl font-bold capitalize md:text-3xl'>
        What client say about us
      </h1>
      <div className='mx-auto mt-20 w-[90%] md:w-[80%]'>
        <Carousel
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite
          responsive={responsive}
          showDots
        >
          {reviewCard.map((re) => (
            <ReviewCard
              key={re.name}
              name={re.name}
              image={re.image}
              rating={re.rating}
              position={re.position}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Reviews;
