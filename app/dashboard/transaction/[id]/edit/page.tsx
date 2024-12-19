import TransactionForm from '@/app/dashboard/components/transaction-form';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type EditTransactionPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Edit Transaction',
};

const EditTransactionPage = async ({ params }: EditTransactionPageProps) => {
  // Await the params
  const { id } = await params;
  const supabase = await createClient();

  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  // Handle cases where transaction is not found
  if (error || !transaction) {
    notFound();
  }

  return (
    <>
      <h1 className='mb-8 text-4xl font-semibold'>Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
};

export default EditTransactionPage;
