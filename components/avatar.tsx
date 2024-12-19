import { createClient } from '@/lib/supabase/server';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';

type AvatarProps = unknown;

const Avatar = async ({ width = 32, height = 32 }) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Error retrieving user:', userError);
    return <div>Error retrieving user</div>;
  }
  const { data, error: error } = await supabase.storage
    .from('avatars')
    .createSignedUrl(user.user_metadata?.avatar, 60 * 5);
  if (error) {
    return <CircleUser className='h-6 w-6' />;
  }

  const signedUrl = data.signedUrl;

  return (
    <Image
      src={signedUrl}
      width={width}
      height={height}
      alt='signed url data'
      className='h-6 w-6 rounded-full'
    />
  );
};

export default Avatar;
