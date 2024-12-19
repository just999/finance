import { cn } from '@/lib/utils';

import { sizes, variants } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/server';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import Avatar from './avatar';
import ServerThemeWrapper from './server-theme-wrapper';
import SignOutButton from './sign-out-button';

type PageHeaderProps = {
  className?: string;
};

const PageHeader = async ({ className }: PageHeaderProps) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header className={cn(`flex items-center justify-between`, className)}>
      <Link
        href='/dashboard'
        className='text-xl decoration-2 underline-offset-8 hover:underline'
      >
        Finance
      </Link>

      <div className='flex items-center space-x-4'>
        <div className='flex items-center'>
          <ServerThemeWrapper />
          {user && (
            <Link
              href='/dashboard/settings'
              className={cn(
                'flex items-center space-x-1',
                variants['ghost'],
                sizes['sm']
              )}
            >
              <Avatar />
              <span>{user?.user_metadata.fullName ?? user?.email}</span>
            </Link>
          )}
          {user && <SignOutButton />}

          {!user && (
            <Link href='/login' className={cn(variants['ghost'], sizes['sm'])}>
              <KeyRound className='h-6 w-6' />
            </Link>
          )}
        </div>
        <div>User dropdown</div>
      </div>
    </header>
  );
};

export default PageHeader;
