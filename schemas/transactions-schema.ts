import { categories } from '@/lib/helpers';
import { z } from 'zod';

const typeEnum = z.enum(['Income', 'Expense', 'Investment', 'Saving']);
const categoryEnum = z.enum([
  'Housing',
  'Transport',
  'Health',
  'Food',
  'Education',
  'Other',
]);

export const transactionsSchema = z
  .object({
    type: typeEnum,
    // category: z.union([categoryEnum, z.literal('')]),
    category: z.preprocess(
      (val) => (typeof val === 'string' && val?.length ? val : ''),
      z.union([categoryEnum, z.literal('')])
    ),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'date is required',
    }),
    amount: z.coerce.number().min(1, {
      message: 'Amount is required & must at least 1',
    }),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'Expense') {
        return (
          data.category !== undefined && categories.includes(data.category)
        );
      }

      return true;
    },
    {
      path: ['category'],
      message: 'Category is required for Expense',
    }
  );

export type TransactionsSchema = z.infer<typeof transactionsSchema>;
