import Skeleton from '@/components/skeleton';

const Loading = () => {
  return (
    <>
      <h1 className='mb-8 text-4xl font-semibold'>Edit Transaction</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12' />
        <Skeleton className='h-12 md:col-span-2' />
      </div>
    </>
  );
};

export default Loading;
