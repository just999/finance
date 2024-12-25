import { Button } from '@/components/ui/button';
import { ServicePlanProps } from '@/lib/helpers';
import { CircleCheckBig } from 'lucide-react';

type PriceCardProps = {
  price: number;
  plan: string;
  services: ServicePlanProps[];
};

const PriceCard = ({ price, plan, services }: PriceCardProps) => {
  return (
    <div className='rounded-lg bg-white p-12 shadow-lg dark:bg-slate-700 dark:text-slate-200'>
      <p className='mt-8 text-center text-xl font-semibold text-blue-700'>
        {plan} Plan
      </p>
      <div className='mt-4 text-center text-3xl font-medium'>
        $<span className='text-5xl font-bold'>{price}</span>/mo
      </div>
      <p className='mt-2 text-center text-gray-600 dark:text-slate-200'>
        Per user
      </p>
      <div className='mt-10'>
        {services.map((service) => (
          <div
            className='mb-4 flex items-center space-x-3 text-center'
            key={service.service}
          >
            <div className='flex h-8 w-8 flex-col items-center justify-center rounded-full bg-gray-200 text-center'>
              <CircleCheckBig className='text-emerald-500' />
            </div>
            <p className='xs:text-xs text-sm font-semibold text-gray-700 dark:text-slate-200'>
              {service.service}
            </p>
          </div>
        ))}

        <div className='mt-8'>
          <Button
            variant='ghost'
            className='hover:text-gray-100. w-full bg-blue-900 p-4 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-950 md:text-base'
          >
            Start 14 Days Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
