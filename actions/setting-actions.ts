'use server';

import { createClient } from '@/lib/supabase/server';
import { settingsSchema } from '@/schemas/settings-schema';
import { UserMetadataProps } from '@/types/type';

export async function updateSettings(
  _prevState: unknown,
  formData: FormData
): Promise<UserMetadataProps> {
  const validated = settingsSchema.safeParse({
    fullName: formData.get('fullName'),
    defaultView: formData.get('defaultView'),
  });
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      error: true,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });
  if (error) {
    return {
      error: true,
      message: 'Failed updating setting',
    };
  }
  return { message: 'Successfully updated settings' };
}
