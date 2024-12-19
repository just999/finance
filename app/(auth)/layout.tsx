import { sizes, variants } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main>
      <div className='absolute left-8 top-8'>
        <Link
          href='/'
          className={cn(
            variants['ghost'],
            sizes['base'],
            'flex items-center space-x-2 text-sm'
          )}
        >
          <ChevronLeft className='h-4 w-4' />
          <span>Back</span>
        </Link>
      </div>

      <div className='mt-8'>{children}</div>
    </main>
  );
};

export default AuthLayout;
