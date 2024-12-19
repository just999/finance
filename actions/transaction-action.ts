'use server';

import { createClient } from '@/lib/supabase/server';
import {
  transactionsSchema,
  TransactionsSchema,
} from '@/schemas/transactions-schema';
import { revalidatePath } from 'next/cache';

// export async function purgeTransactionListCache() {
//   revalidateTag('transaction-list');
// }

// ?CREATE TRANSACTION
export async function createTransaction(formData: TransactionsSchema) {
  const validated = transactionsSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid Data or missing data');
  }

  const client = await createClient();
  const { error } = await client.from('transactions').insert(validated.data);
  if (error) {
    throw new Error('Failed to create transaction');
  }

  revalidatePath('/dashboard');
}

// ?UPDATE TRANSACTION
export async function updateTransaction(
  id: string,
  formData: TransactionsSchema
) {
  const validated = transactionsSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid Data or missing data');
  }

  const client = await createClient();
  const { error } = await client
    .from('transactions')
    .update(validated.data)
    .eq('id', id);

  if (error) {
    throw new Error('Failed to update transaction');
  }

  revalidatePath('/dashboard');
}

// ?FETCH TRANSACTION
export async function fetchTransactions(
  range?: string,
  offset = 0,
  limit = 10
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('fetch_transactions', {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });

  // const { data, error } = await supabase.from('transactions').select();
  if (error) throw new Error('We cant fetch transactions');
  return data;
}

// ?DELETE TRANSACTION
export async function deleteTransaction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw new Error(`Could not delete the transaction with id ${id}`);

  revalidatePath('/dashboard');
}
