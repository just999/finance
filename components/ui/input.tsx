import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  isDirty?: boolean;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, suffix, type, isInvalid, isDirty, errorMessage, ...props },
    ref
  ) => {
    return (
      <>
        <div className={cn('relative flex w-full items-center gap-2')}>
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix}
        </div>
        {isInvalid && errorMessage && (
          <span
            className={cn(
              'error-message text-shadow rounded-sm bg-fuchsia-100 px-4 text-xs text-red-700'
            )}
          >
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
