'use client';

import { useState } from 'react';
import MobileNav from './mobile-nav';
import Nav from './nav';

type ResponsiveNavProps = unknown;

const ResponsiveNav = () => {
  const [show, setShow] = useState(false);

  const handleOpenNav = () => {
    setShow(true);
  };
  const handleCloseNav = () => {
    setShow(false);
  };
  return (
    <div>
      <Nav openNav={handleOpenNav} />
      <MobileNav showNav={show} closeNav={handleCloseNav} />
    </div>
  );
};

export default ResponsiveNav;
