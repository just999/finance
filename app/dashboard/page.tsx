import { sizes, types, variants } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Range from './components/range';
import TransactionListFallback from './components/transaction-list-fallback';
import TransactionListWrapper from './components/transaction-list-wrapper';
import Trend from './components/trend';
import TrendFallback from './components/trend-fallback';

type DashboardPageProps = {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
};

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const searchParam = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const settings = user?.user_metadata;

  const range = searchParam?.range ?? settings?.defaultView ?? 'last30days';

  return (
    <div className='mt-28 space-y-4'>
      <section className='flex items-center justify-between'>
        <h1 className='text-4xl font-semibold'>Summary</h1>
        <aside>
          <Range defaultView={settings?.defaultView} />
        </aside>
      </section>

      <section className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
        {types.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className='text-red-500'>Can not fetch trend data</div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      <section className='flex items-center justify-between'>
        <h2 className='text-2xl'>Transactions</h2>
        <Link
          href='/dashboard/transaction/add'
          className={cn(
            'flex items-center space-x-1',
            variants['outline'],
            sizes['sm']
          )}
        >
          <PlusCircle className='h-4 w-4' />
          <div>Add</div>
        </Link>
      </section>

      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
