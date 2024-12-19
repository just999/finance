import { TransactionListProps } from '@/types/type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GroupedTransactions = {
  [date: string]: {
    transactions: TransactionListProps[];
    amount: number;
  };
};

export const groupAndSumTransactionsByDate = (
  transactions: TransactionListProps[]
): GroupedTransactions => {
  const grouped: GroupedTransactions = {};

  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0];

    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }

    grouped[date].transactions.push(transaction);

    const amount =
      transaction.type === 'Expense'
        ? -(transaction.amount || 0)
        : transaction.amount || 0;

    grouped[date].amount += amount;
  }

  return grouped;
};
