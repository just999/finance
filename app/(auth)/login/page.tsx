import SigninForm from './components/signin-form';

type LoginPageProps = unknown;

const LoginPage = () => {
  return (
    // <div className='mx-auto flex w-full flex-col justify-center space-y-6 py-40 sm:w-[350px]'>
    //   <div className='flex flex-col space-y-8 text-center'>
    //     <h1 className='text-2xl font-semibold'>Welcome Back</h1>
    //     <p className='text-sm text-gray-500 dark:text-gray-400'>
    //       Enter your Email to sign in/Create your account no password required
    //     </p>
    //   </div>
    //   <div>
    //     <LoginForm />
    //   </div>
    // </div>

    <main className='flex min-h-[calc(100vh-114px)] items-center justify-center'>
      <SigninForm />
    </main>
  );
};

export default LoginPage;
