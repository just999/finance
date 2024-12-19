import { z } from 'zod';
const sizeLimit = 5 * 1024;

const allowedImageTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/gif',
];

export const avatarSchema = z
  .instanceof(File)
  .refine((file) => allowedImageTypes.includes(file.type), {
    message: 'Invalid Image file type',
  })
  .refine((file) => file.size <= sizeLimit, {
    message: 'File size should not exceed 512kb',
  });

export type avatarSchema = z.infer<typeof avatarSchema>;
