import { cn } from '@/lib/utils';

import LogoutButton from '@/app/(logged-in)/logout-button';
import { auth } from '@/auth';
import { sizes, variants } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/server';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import Logo from './assets/logo/logo';
import Avatar from './avatar';
import ServerThemeWrapper from './server-theme-wrapper';

type PageHeaderProps = {
  className?: string;
};

const PageHeader = async ({ className }: PageHeaderProps) => {
  const supabase = await createClient();

  const session = await auth();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header
      className={cn(`flex w-full items-center justify-between`, className)}
    >
      <nav className='flex w-full p-2 dark:bg-gray-800'>
        <ul className='flex w-full items-center justify-between gap-4 dark:bg-gray-800 dark:hover:bg-gray-800'>
          <li className='flex items-center space-x-2'>
            <Link
              href='/my-account'
              className='text-xl decoration-2 underline-offset-8 hover:underline'
            >
              <Logo className='svg fill-orange-600' />
            </Link>
            {session?.user?.email && (
              <Link href='/change-password'>Change Password</Link>
            )}
          </li>

          <li>
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
              {session?.user?.email && <LogoutButton />}
              {/* {session?.user?.email && <SignOutButton />} */}

              {!session?.user?.email && (
                <Link
                  href='/login'
                  className={cn(variants['ghost'], sizes['sm'])}
                >
                  <KeyRound className='h-6 w-6' />
                </Link>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
