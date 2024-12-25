type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='container mx-auto h-screen max-w-5xl'>{children}</main>
  );
};

export default Layout;
