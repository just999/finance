'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type SelectProps = React.ComponentProps<'select'> & {
  children?: React.ReactNode;
  className?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          'w-full rounded-md border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950',
          className
        )}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
