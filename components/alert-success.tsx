'use client';

import { AvatarPageProps } from '@/app/dashboard/settings/avatar/page';
import { Check } from 'lucide-react';
import Alert from './alert';

type AlertSuccessProps = {
  state: AvatarPageProps;
};

const AlertSuccess = ({ state }: AlertSuccessProps) => {
  return (
    <Alert
      icon={
        <Check className='h-6 w-6 text-emerald-700 dark:text-emerald-300' />
      }
      title={
        <span className='text-emerald-700 dark:text-emerald-300'>Success</span>
      }
    >
      <span className='text-emerald-700 dark:text-emerald-300'>
        {state?.message}
      </span>
    </Alert>
  );
};

export default AlertSuccess;
