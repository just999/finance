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

// Zod schema for validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  // password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginSchema = z.infer<typeof loginSchema>;
