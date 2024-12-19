'use client';

import SideNav from './components/side-nav';

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className='grid grid-cols-4 gap-8'>
      <aside className='col-span-4 lg:col-span-1'>
        <SideNav />
      </aside>

      <div className='col-span-4 lg:col-span-3'>{children}</div>
    </div>
  );
};

export default SettingsLayout;
