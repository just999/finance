'use server';

import { LoginActionState } from '@/app/(auth)/login/components/login-form';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// // LOGIN ACTION
// export async function login(prevState: unknown, formData: FormData) {
// }

export async function login(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // Validate form data
  // const validatedFields = loginSchema.safeParse({
  //   email,
  //   password,
  // });

  // if (!validatedFields.success) {
  //   return {
  //     email,
  //     password,
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     errors: true,
  //     message: 'You have successfully login',
  //   };
  // }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return {
      errors: true,
      message: 'Error authenticating',
    };
  }

  return { message: `Email sent to ${email}` };
}

// SIGNOUT ACTION
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  redirect('/login');
}
