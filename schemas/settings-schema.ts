import { dateRangeValues } from '@/lib/helpers';
import { z } from 'zod';

export const settingsSchema = z.object({
  fullName: z.string().min(2),
  defaultView: z.enum(dateRangeValues),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
