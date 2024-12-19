'use client';

import { cn } from '@/lib/utils';

type LabelProps = React.ComponentProps<'label'> & {
  children: React.ReactNode;
  className?: string;
};

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor='checkbox'
      className={cn('ml-2 block text-gray-700 dark:text-gray-300', className)}
    >
      {children}
    </label>
  );
};

export default Label;
