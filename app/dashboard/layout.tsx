import PageHeader from '@/components/page-header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <PageHeader className='my-8' />
      <main>{children}</main>
      <footer className='mt-auto py-8 text-center'>&copy;Footer</footer>
    </>
  );
};

export default Layout;
