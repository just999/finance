'use client';

import { signOut } from '@/actions/auth-actions';
import { LogOut } from 'lucide-react';
import SubmitButton from './submit-button';

type SignOutButtonProps = unknown;

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <SubmitButton variant='ghost' size='sm'>
        <LogOut className='h-4 w-4' />
      </SubmitButton>
    </form>
  );
};

export default SignOutButton;
