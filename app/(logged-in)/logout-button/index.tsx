'use client';

import SubmitButton from '@/components/submit-button';
import { ButtonProps } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

type LogoutButtonProps = ButtonProps & {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  size?: 'base' | 'xs' | 'sm' | 'lg';
  className?: string;
};

const LogoutButton = (props: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <SubmitButton
      {...props}
      onClick={handleLogout}
      // className={cn(className)}
      variant='ghost'
    >
      <LogOut className='h-4 w-4' /> <span className='text-xs'>Logout</span>
    </SubmitButton>
  );
};

export default LogoutButton;
