'use client';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from './button';

type SubmitButtonProps = ButtonProps & {
  children?: React.ReactNode;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={cn(
        props.className,
        'flex items-center justify-center gap-2 space-x-1'
      )}
      disabled={pending}
    >
      {pending && <Loader className='h-4 w-4 animate-spin' />}
      <span>{props.children}</span>
    </Button>
  );
};

export default SubmitButton;
