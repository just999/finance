// import { z } from 'zod';

// export const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, {
//       message: 'Email is required',
//     })
//     .email({
//       message: 'Invalid email address',
//     }),
// });

// export type LoginSchema = z.infer<typeof loginSchema>;

import { z } from 'zod';

export const passwordSchema = z.string().min(5, {
  message: 'password min 5 characters',
});

export const passwordMatchedSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string().min(1, {
      message: 'confirm password required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'Password do not match',
      });
    }
  });

export type PasswordMatchedSchema = z.infer<typeof passwordMatchedSchema>;

// Zod schema for validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  // password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, {
      message: 'password min 5 characters',
    }),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'Password do not matched',
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const signinSchema = z.object({
  token: z.string().optional(),
  email: z.string().email(),
  password: passwordSchema,
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
  })
  .and(passwordMatchedSchema);

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z
  .object({
    token: z.string().optional(),
  })
  .and(passwordMatchedSchema);

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
