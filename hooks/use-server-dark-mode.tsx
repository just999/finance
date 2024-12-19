import { cookies } from 'next/headers';

const useServerDarkMode = async (defaultTheme = 'light') => {
  const cookieStore = await cookies();
  return (cookieStore.get('theme')?.value ?? defaultTheme) as 'dark' | 'light';
};

export default useServerDarkMode;