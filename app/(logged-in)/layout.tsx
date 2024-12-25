import { auth } from '@/auth';
import { redirect } from 'next/navigation';

type LoggedInLayoutProps = {
  children: React.ReactNode;
};

const LoggedInLayout = async ({ children }: LoggedInLayoutProps) => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  return (
    <div className='flex min-h-[calc(100vh-58px)] flex-col items-center justify-between bg-gray-200 p-2 dark:bg-gray-800'>
      {/* <nav className='flex items-center justify-between bg-gray-200 p-2 dark:bg-gray-800'>
        <ul className='flex gap-4 dark:bg-gray-800 dark:hover:bg-gray-800'>
          <li>
            <Link href='/my-account'>My Account</Link>
          </li>
          <li>
            <Link href='/change-password'>Change Password</Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav> */}
      <div className='flex flex-1 items-center justify-center'>{children}</div>
    </div>
  );
};

export default LoggedInLayout;
