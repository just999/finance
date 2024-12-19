'use client';

import { cn } from '@/lib/utils';
import { Camera, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideNavProps = unknown;

const SideNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className='space-y-2'>
        <li>
          <Link
            href='/dashboard/settings'
            className={cn(
              'flex items-center space-x-2 rounded-md px-2.5 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800',
              pathname === '/dashboard/settings'
                ? 'bg-gray-100 dark:bg-gray-800'
                : ''
            )}
          >
            <Settings className='h-4 w-4' />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard/settings/avatar'
            className={cn(
              'flex items-center space-x-2 rounded-md px-2.5 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800',
              pathname === '/dashboard/settings/avatar'
                ? 'bg-gray-100 dark:bg-gray-800'
                : ''
            )}
          >
            <Camera className='h-4 w-4' />
            <span>Avatar</span>
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard/settings/profile'
            className={cn(
              'flex items-center space-x-2 rounded-md px-2.5 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800',
              pathname === '/dashboard/settings/profile'
                ? 'bg-gray-100 dark:bg-gray-800'
                : ''
            )}
          >
            <User className='h-4 w-4' />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
