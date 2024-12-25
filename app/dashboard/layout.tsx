type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className='container mx-auto h-screen'>{children}</main>;
};

export default Layout;
