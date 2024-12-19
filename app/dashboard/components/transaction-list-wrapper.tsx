import { fetchTransactions } from '@/actions/transaction-action';
import TransactionList from './transaction-list';

type TransactionListWrapperProps = {
  range: string;
};

const TransactionListWrapper = async ({
  range,
}: TransactionListWrapperProps) => {
  const transactions = await fetchTransactions(range);

  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
};

export default TransactionListWrapper;
