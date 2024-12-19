'use client';

import useDarkMode from '@/hooks/use-dark-mode';
import { Moon, Sun } from 'lucide-react';
import Button from './button';

type Theme = 'dark' | 'light';

type DarkModeToggleProps = {
  defaultMode: Theme;
  className?: string;
};

const DarkModeToggle = ({
  className,
  defaultMode = 'light',
}: DarkModeToggleProps) => {
  const { theme, toggleTheme } = useDarkMode({ defaultTheme: defaultMode });
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleTheme}
      className={className}
    >
      {theme === 'dark' && <Sun className='h-6 w-6' />}
      {theme === 'light' && <Moon className='h-6 w-6' />}
    </Button>
  );
};

export default DarkModeToggle;
