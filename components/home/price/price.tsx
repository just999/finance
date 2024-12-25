import { priceCard } from '@/lib/helpers';
import PriceCard from './price-card';

type PriceProps = unknown;

const Price = () => {
  return (
    <div className='bg-[#edfbff] py-16 dark:bg-slate-950 dark:text-slate-200'>
      <h2 className='mt-6 text-center text-2xl font-bold capitalize md:text-3xl'>
        Meet exciting Pricing Plans
      </h2>
      <div className='mx-auto mt-20 grid w-[90%] grid-cols-1 gap-10 md:w-[80%] lg:grid-cols-2'>
        {priceCard.map((price) => (
          <div
            data-aos={price.aos['data-aos']}
            data-aos-anchor-placement={price.aos['data-aos-anchor-placement']}
            data-aos-delay={price.aos['data-aos-delay']}
            key={price.price}
          >
            <PriceCard
              price={price.price}
              plan={price.plan}
              services={price.services}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Price;
