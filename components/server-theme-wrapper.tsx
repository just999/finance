// server-theme.tsx
import { cookies } from 'next/headers';
import DarkModeToggle from './dark-mode-toggle';

export default async function ServerThemeWrapper() {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value ?? 'light') as
    | 'light'
    | 'dark';

  return <DarkModeToggle defaultMode={theme} />;
}
