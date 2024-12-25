import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import PasswordResetForm from './reset-password-form';

type PasswordResetPageProps = unknown;

const PasswordResetPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your registered email to reset your password
          </CardDescription>
        </CardHeader>

        <PasswordResetForm />

        <CardFooter className='flex flex-col gap-2 text-xs text-muted-foreground'>
          <div>
            Remember your password?{' '}
            <Link href='/login' className='underline'>
              Login
            </Link>
          </div>
          <div>
            Don&apos;t have account?{' '}
            <Link href='/register' className='underline'>
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default PasswordResetPage;
