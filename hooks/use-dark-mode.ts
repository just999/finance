'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type Theme = 'dark' | 'light';

export type ThemeProps = {
  defaultTheme: Theme;
};

const useDarkMode = ({ defaultTheme }: ThemeProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme);
  const [_, setCookie] = useCookies(['theme']);

  useEffect(() => {
    // Set initial theme on mount
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setAndSaveTheme = (theme: 'dark' | 'light') => {
    setTheme(theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    setCookie('theme', theme);
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
