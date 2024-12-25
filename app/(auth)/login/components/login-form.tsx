'use client';

import { login } from '@/actions/auth-actions';
import SubmitButton from '@/components/submit-button';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';

export type LoginActionState = {
  message?: string;
  // email?: string;
  // password?: string;
  errors?: boolean;
};

const initialState = {
  message: '',
  // email: '',
  // password: '',
  errors: false,
};

export default function LoginForm() {
  // Use useActionState hook
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className='space-y-4'>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          required
          className='w-full border p-2'
        />
        {/* {state?.message && <p className='text-red-500'>{state.message}</p>} */}
      </div>

      <SubmitButton type='submit' className='w-full bg-blue-500 p-2 text-white'>
        Login
      </SubmitButton>
      <p
        className={cn(
          state.errors ? 'text-red-500' : 'text-green-500',
          'text-center text-sm'
        )}
      >
        {state.message}
      </p>
    </form>
  );
}
