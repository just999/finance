import { Metadata } from 'next';
import TransactionForm from '../../components/transaction-form';

export const metadata: Metadata = {
  title: 'Add Transaction',
};

const AddTransactionPage = () => {
  return (
    <>
      <h1 className='mb-8 text-4xl font-semibold'>Add Transaction</h1>
      <TransactionForm />
    </>
  );
};

export default AddTransactionPage;
