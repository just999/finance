'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type AlertProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
  type: string;
};

const Alert = ({ title, icon, children, type }: AlertProps) => {
  const pathname = useParams();
  console.log('🚀 ~ Alert ~ pathname:', pathname);
  return (
    <Card className='flex flex-col items-center justify-center space-y-2 rounded-md border border-gray-200 p-2 dark:border-gray-800'>
      <CardHeader>
        <CardTitle className='flex items-center justify-center gap-2'>
          <span className='flex-shrink-0'>{icon}</span>
          <span className='space-y-1'>
            <h5>{title}</h5>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-center gap-4 text-sm'>
        <span>{children}</span>
        {type === 'auth' && (
          <Button asChild size='sm'>
            <Link href='/login'>Login</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Alert;
