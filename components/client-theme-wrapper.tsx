'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import DarkModeToggle from './dark-mode-toggle';

const ClientThemeWrapper = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = Cookies.get('theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  return <DarkModeToggle defaultMode={theme} />;
};

export default ClientThemeWrapper;
