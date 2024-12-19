'use client';

import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'h-4 w-full animate-pulse rounded-md bg-gray-300 dark:bg-gray-700',
        className
      )}
    ></div>
  );
};

export default Skeleton;
