// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import * as React from 'react';
// import { useState } from 'react';

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   isInvalid?: boolean;
//   isDirty?: boolean;
//   errorMessage?: React.ReactNode;
// }

// const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, isInvalid, isDirty, errorMessage, ...props }, ref) => {
//     const [show, setShow] = useState(false);

//     return (
//       <Input
//         isDirty={isDirty}
//         type={show ? 'text' : 'password'}
//         suffix={
//           show ? (
//             <EyeIcon
//               size={18}
//               className='absolute cursor-pointer select-none text-zinc-400 ring-4 hover:text-stone-600'
//               onClick={() => setShow(false)}
//             />
//           ) : (
//             <EyeOffIcon
//               size={18}
//               className='absolute cursor-pointer select-none text-zinc-400 ring-4 hover:text-stone-600'
//               onClick={() => setShow(true)}
//             />
//           )
//         }
//         isInvalid={isInvalid}
//         errorMessage={errorMessage}
//         className={cn('relative', className)}
//         {...props}
//         ref={ref}
//       />
//     );
//   }
// );

// PasswordInput.displayName = 'PasswordInput';

// export { PasswordInput };

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef, useState } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // isInvalid?: boolean;
  // isDirty?: boolean;
  // errorMessage?: React.ReactNode;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        // isDirty={isDirty}
        type={show ? 'text' : 'password'}
        suffix={
          show ? (
            <EyeIcon
              size={18}
              className='absolute right-2 cursor-pointer select-none text-zinc-400 hover:text-stone-600'
              onClick={() => setShow(false)}
            />
          ) : (
            <EyeOffIcon
              size={18}
              className='absolute right-2 cursor-pointer select-none text-zinc-400 hover:text-stone-600'
              onClick={() => setShow(true)}
            />
          )
        }
        // isInvalid={isInvalid}
        // errorMessage={errorMessage}
        className={cn('relative', className)}
        {...props}
        ref={ref}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
