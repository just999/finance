import { whyChooseCard } from '@/lib/helpers';
import WhyChooseCard from './why-choose-card';

type WhyChooseProps = unknown;

const WhyChoose = () => {
  return (
    <div className='py-16 dark:bg-slate-950 dark:text-slate-100'>
      <h1 className='mt-6 text-center text-2xl font-bold capitalize md:text-3xl'>
        Why you choose this application?
      </h1>
      <div className='mx-auto mt-20 grid w-[90%] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {whyChooseCard.map((why) => (
          <div
            data-aos='fade-right'
            data-aos-anchor-placement='top-center'
            data-aos-delay='100'
            className='flex'
            key={why.title}
          >
            <WhyChooseCard
              image={why.image}
              title={why.title}
              linkText={why.linkText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
