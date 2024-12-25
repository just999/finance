'use client';

import { signout } from '@/actions/auth-actions';
import { LogOut } from 'lucide-react';
import SubmitButton from './submit-button';

type SignOutButtonProps = unknown;

const SignOutButton = () => {
  return (
    <form action={signout}>
      <SubmitButton variant='ghost' size='sm'>
        <LogOut className='h-4 w-4' /> <span className='text-xs'>Logout</span>
      </SubmitButton>
    </form>
  );
};

export default SignOutButton;
