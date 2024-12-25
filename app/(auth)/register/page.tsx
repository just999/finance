import SignupForm from './components/signup-form';

type RegisterPageProps = unknown;

const RegisterPage = () => {
  return (
    // <div className='mx-auto flex w-full flex-col justify-center space-y-6 py-40 sm:w-[350px]'>
    //   <div className='flex flex-col space-y-8 text-center'>
    //     <h1 className='text-2xl font-semibold'>Welcome</h1>
    //     <p className='text-sm text-gray-500 dark:text-gray-400'>
    //       Registration Form New Member
    //     </p>
    //   </div>
    //   <div>
    //     <SignupForm />
    //   </div>
    // </div>

    <main className='flex min-h-screen items-center justify-center'>
      <SignupForm />
    </main>
  );
};

export default RegisterPage;
