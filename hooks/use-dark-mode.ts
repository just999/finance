'use client';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type Theme = 'dark' | 'light';

export type ThemeProps = {
  defaultTheme: Theme;
};

const useDarkMode = ({ defaultTheme }: ThemeProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme);
  const [cookies, setCookie] = useCookies(['theme']);

  useEffect(() => {
    // Set initial theme on mount

    const storedTheme = cookies.theme as Theme;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    } else {
      setCookie('theme', defaultTheme);
    }
  }, [theme, cookies, defaultTheme, setCookie]);

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
