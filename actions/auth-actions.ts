'use server';

import { LoginActionState } from '@/app/(auth)/login/components/login-form';
import { auth, signIn, signOut } from '@/auth';
import db from '@/lib/db/drizzle';
import { passwordResetTokens } from '@/lib/db/passwordResetTokenSchema';
import { users } from '@/lib/db/users-schema';
import { mailer } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';
import {
  changePasswordSchema,
  ChangePasswordSchema,
  passwordMatchedSchema,
  registerSchema,
  RegisterSchema,
  resetPasswordSchema,
  ResetPasswordSchema,
  SigninSchema,
  signinSchema,
  UpdatePasswordSchema,
} from '@/schemas/auth-schema';
import { DatabaseError } from '@neondatabase/serverless';
import { compare, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { authenticator } from 'otplib';

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

// !REGISTER ACTION

export async function register(formData: RegisterSchema) {
  console.log(formData);

  // const res = await db.select();

  try {
    const validated = registerSchema.safeParse(formData);
    const email = validated.data?.email;
    const password = validated.data?.password;
    const passwordConfirm = validated.data?.passwordConfirm;

    if (!validated.success) {
      return {
        error: true,
        message: validated.error.issues[0].message ?? 'An error validate',
      };
    }

    if (password !== passwordConfirm) {
      return {
        error: true,
        message: 'confirm password not equal to password',
      };
    }

    const hashedPassword = await hash(validated.data.password, 12);

    await db.insert(users).values({
      email,
      password: hashedPassword,
    });
  } catch (err: unknown) {
    const error = err as DatabaseError;
    if (error.code === '23505') {
      return {
        error: true,
        message: 'the account already registered',
      };
    }

    return {
      error: true,
      message: 'Something went wrong',
    };
  }

  return {
    error: false,
    message: 'successfully registered',
  };
}

// !SIGNOUT ACTION
export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  redirect('/login');
}

// !SIGNIN ACTION

export async function loginWithCredentials(formData: SigninSchema) {
  console.log(formData);

  // const res = await db.select();

  try {
    const validated = signinSchema.safeParse(formData);
    const email = validated.data?.email;
    const password = validated.data?.password;
    const token = validated.data?.token;

    if (!validated.success) {
      return {
        error: true,
        message: validated.error.issues[0].message ?? 'An error validate',
      };
    }

    const result = await signIn('credentials', {
      token,
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return {
        error: true,
        message: 'Incorrect email or password',
      };
    }

    return {
      error: false,
      message: 'Successfully Signin',
    };
  } catch (err: unknown) {
    // const error = err as DatabaseError;
    // if (error.code === '23505') {
    //   return {
    //     error: true,
    //     message: 'the account already signin',
    //   };
    // }

    return {
      error: true,
      message: 'Incorrect email or password',
    };
  }

  // return {
  //   error: false,
  //   message: 'successfully signin',
  // };
}

// !LOGOUT ACTION
export const logout = async () => {
  await signOut();
};

// !CHANGE PASSWORD ACTION
export const changePassword = async (formData: ChangePasswordSchema) => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: 'Unauthenticated',
    };
  }

  const validated = changePasswordSchema.safeParse(formData);

  if (validated.error) {
    return {
      error: true,
      message: validated.error.issues[0].message ?? 'something went wrong',
    };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)));

  if (!user) {
    return {
      error: true,
      message: 'User not found!',
    };
  }

  const validPassword = await compare(
    validated.data.currentPassword,
    user.password as string
  );
  if (!validPassword) {
    return {
      error: true,
      message: 'Incorrect password',
    };
  }

  const hashedPassword = await hash(validated.data.password, 12);

  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, parseInt(session.user.id)));

  return {
    error: false,
    message: 'successfully change password',
  };
};

// !RESET PASSWORD ACTIONS
export const resetPassword = async (formData: ResetPasswordSchema) => {
  const session = await auth();

  if (!!session?.user?.id) {
    return {
      error: true,
      message: 'You already logged in',
    };
  }

  const validated = resetPasswordSchema.safeParse(formData);
  if (validated.error) {
    return {
      error: true,
      message: validated.error.issues[0].message ?? 'something went wrong',
    };
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, validated.data.email));

  if (!user) {
    return {};
  }

  const passwordResetToken = randomBytes(32).toString('hex');

  const tokenExpiry = new Date(Date.now() + 3600000);
  await db
    .insert(passwordResetTokens)
    .values({
      userId: user.id,
      token: passwordResetToken,
      tokenExpiry,
    })
    .onConflictDoUpdate({
      target: passwordResetTokens.userId,
      set: {
        token: passwordResetToken,
        tokenExpiry,
      },
    });

  const resetLink = `${process.env.SITE_BASE_URL}/update-password?token=${passwordResetToken}`;

  const emailAddress = 'tommydewa08@gmail.com';

  await mailer.sendMail({
    from: 'test@resend.dev',
    subject: 'Your password reset request',
    to: emailAddress,
    html: `Hey, ${emailAddress}! here you request reset password link & will expire in 1 hour:
<a href='${resetLink}'>${resetLink}</a>
    `,
  });
};

// ?UPDATE PASSWORD ACTION
export const updatePassword = async (formData: UpdatePasswordSchema) => {
  const validated = passwordMatchedSchema.safeParse(formData);

  if (!validated.success) {
    return {
      error: true,
      message: validated.error.issues[0]?.message ?? 'something went wrong',
    };
  }

  const session = await auth();

  if (session?.user?.id) {
    return {
      error: true,
      message: 'You already logged in',
    };
  }

  let tokenIsValid = false;

  if (formData.token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, formData.token));

    const now = Date.now();

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      tokenIsValid = true;
    }

    if (!tokenIsValid) {
      return {
        error: true,
        message: 'Your token is invalid or has expired',
        tokenInvalid: true,
      };
    }

    const hashedPassword = await hash(validated.data.password, 12);
    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, passwordResetToken.userId!));

    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, passwordResetToken.id));
  }
};

export const get2faSecret = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)));

  if (!user) {
    return {
      error: true,
      message: 'User not found',
    };
  }

  let twoFactorSecret = user.twoFactorSecret;

  if (!twoFactorSecret) {
    twoFactorSecret = authenticator.generateSecret();
    await db
      .update(users)
      .set({
        twoFactorSecret,
      })
      .where(eq(users.id, parseInt(session.user.id)));
  }

  return {
    twoFactorSecret: authenticator.keyuri(
      session.user.email ?? '',
      'finance',
      twoFactorSecret
    ),
  };
};

export const activate2fa = async (token: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const [user] = await db
    .select({
      twoFactorSecret: users.twoFactorSecret,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)));

  if (!user) {
    return {
      error: true,
      message: 'User not found',
    };
  }

  if (user.twoFactorSecret) {
    const validToken = authenticator.check(token, user.twoFactorSecret);

    if (!validToken) {
      return {
        error: true,
        message: 'Invalid OTP',
      };
    }

    await db
      .update(users)
      .set({
        twoFactorActivated: true,
      })
      .where(eq(users.id, parseInt(session.user.id)));
  }
};

export const disable2fa = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  await db
    .update(users)
    .set({
      twoFactorActivated: false,
    })
    .where(eq(users.id, parseInt(session.user.id)));
};

export const preLoginCheck = async (formData: SigninSchema) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, formData.email));

  if (!user) {
    return {
      error: true,
      message: 'Incorrect credentials',
    };
  } else {
    const validPassword = await compare(
      formData.password,
      user.password as string
    );
    if (!validPassword) {
      return {
        error: true,
        message: 'Incorrect credentials',
      };
    }
  }

  return {
    twoFactorActivated: user.twoFactorActivated,
  };
};
