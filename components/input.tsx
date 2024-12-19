'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type Style = 'checkbox' | 'default' | 'file';

type InputProps = React.ComponentProps<'input'> & {
  className?: string;
  style?: Style;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, style = 'default', ...props }, ref) => {
    const styles: Record<Style, string> = {
      checkbox:
        'rounded border-gray-300 bg-white text-gray-700 shadow-sm dark:bg-gray-950 dark:text-gray-500 disabled:opacity-75',
      file: 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400',
      default:
        'w-full rounded-md border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950 disabled:opacity-75',
    };

    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          styles[props.type as Style] ?? styles['default'],
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
