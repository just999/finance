'use client';

import { AvatarPageProps } from '@/app/dashboard/settings/avatar/page';
import { Ban } from 'lucide-react';
import Alert from './alert';

type AlertErrorProps = {
  state: AvatarPageProps;
};

const AlertError = ({ state }: AlertErrorProps) => {
  return (
    <Alert
      icon={<Ban className='h-6 w-6 text-red-700 dark:text-red-300' />}
      title={<span className='text-red-700 dark:text-red-300'>Error</span>}
    >
      <span className='text-red-700 dark:text-red-300'>{state?.message}</span>
    </Alert>
  );
};

export default AlertError;
