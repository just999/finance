import { createClient } from '@/lib/supabase/server';
import SettingsForm from './components/settings-form';

type SettingsPageProps = unknown;

const SettingsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const user_metadata = user?.user_metadata;
  return (
    <>
      <h1 className='mb-8 text-4xl font-semibold'>Settings</h1>

      {user_metadata && <SettingsForm defaults={user_metadata} />}
    </>
  );
};

export default SettingsPage;
