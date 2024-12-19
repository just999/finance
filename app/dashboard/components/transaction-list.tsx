'use client';

import { fetchTransactions } from '@/actions/transaction-action';
import Button from '@/components/button';
import Separator from '@/components/separator';
import TransactionItem from '@/components/transaction-item';
import TransactionSummaryItem from '@/components/transaction-summary-item';
import { groupAndSumTransactionsByDate } from '@/lib/utils';
import { TransactionListProps } from '@/types/type';
import { Loader } from 'lucide-react';
import { useState } from 'react';

type TransactionProps = {
  initialTransactions: TransactionListProps[];
  range: string;
};

const TransactionList = ({ range, initialTransactions }: TransactionProps) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);

  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );

  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleLoadMore = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    let nextTransactions: TransactionListProps[] = [];
    try {
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10
      );
      setButtonHidden(nextTransactions.length === 0);
      // setOffset((prev) => prev + 10);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnRemoved = (id?: string) => () => {
    setTransactions((prev) => [...prev].filter((t) => t.id !== id));
  };

  return (
    <div className='space-y-8'>
      {Object.entries(grouped).map(([date, { transactions, amount }]) => {
        return (
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
            <section className='space-y-4'>
              {transactions.map((tran: TransactionListProps) => (
                <div key={tran.id}>
                  <TransactionItem
                    id={tran.id}
                    type={tran.type}
                    category={tran.category}
                    description={tran.description}
                    amount={Number(tran.amount || 0)}
                    onRemoved={handleOnRemoved(tran.id)}
                  />
                </div>
              ))}
            </section>
          </div>
        );
      })}
      {transactions.length === 0 && (
        <div className='text-center text-gray-400 dark:text-gray-500'>
          No transaction found
        </div>
      )}
      <div className='flex justify-center'>
        {!buttonHidden && (
          <Button
            onClick={(e) => handleLoadMore(e)}
            variant='ghost'
            disabled={loading}
          >
            <div className='flex items-center space-x-1'>
              {loading && <Loader className='animate-spin' />}
              <div>Load More</div>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
