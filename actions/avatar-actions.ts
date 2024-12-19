'use server';

import { AvatarPageProps } from '@/app/dashboard/settings/avatar/page';
import { createClient } from '@/lib/supabase/server';

export async function uploadAvatar(
  state: AvatarPageProps,
  formData: FormData
): Promise<AvatarPageProps> {
  const supabase = await createClient();

  const file = formData.get('avatar') as File;
  // const validationResult = avatarSchema.safeParse(file);

  // if (!validationResult.success) {
  //   throw new Error('Validation Error');
  // }
  const fileExt = file?.name.split('.').pop();

  const filename = `${Math.random()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('avatars')
    .upload(filename, file);

  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar',
    };
  }

  // REMOVE THE OLD AVATAR
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return {
      error: true,
      message: 'Something went wrong',
    };
  }

  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from('avatars').remove([avatar]);

    if (error) {
      return {
        error: true,
        message: 'Something went wrong, try again',
      };
    }
  }

  const { data, error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: filename,
    },
  });
  if (dataUpdateError) {
    return {
      ...state,
      error: true,
      message: 'Error updating user',
    };
  }

  return { error: false, message: 'successfully updating user avatar' };
}
