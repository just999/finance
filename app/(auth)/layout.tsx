import { auth } from '@/auth';
import { redirect } from 'next/navigation';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await auth();

  if (!!session?.user?.email) {
    redirect('/my-account');
  }
  return (
    <main>
      {/* <div className='absolute left-8 top-8'>
        <Link
          href='/'
          className={cn(
            variants['ghost'],
            sizes['base'],
            'flex items-center space-x-2 text-sm'
          )}
        >
          <ChevronLeft className='h-4 w-4' />
          <span>Back</span>
        </Link>
      </div> */}

      {children}
    </main>
  );
};

export default AuthLayout;
