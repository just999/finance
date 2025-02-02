import Skeleton from '@/components/skeleton';

const TransactionListFallback = () => {
  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
      <div className='space-y-4'>
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
    </div>
  );
};

export default TransactionListFallback;

function TransactionItemSkeleton() {
  return (
    <div className='flex w-full items-center space-x-4'>
      <div className='flex grow items-center'>
        <Skeleton />
      </div>
      <div className='hidden min-w-[150px] items-center md:flex'>
        <Skeleton />
      </div>
      <div className='min-w-[70px] text-right'>
        <Skeleton />
      </div>
      <div className='flex min-w-[50px] justify-end'>
        <Skeleton />
      </div>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
  return (
    <div className='flex space-x-4'>
      <div className='grow'>
        <Skeleton />
      </div>
      <div className='min-w-[70px]'>
        <Skeleton />
      </div>

      <div className='min-w-[50px]'></div>
    </div>
  );
}
