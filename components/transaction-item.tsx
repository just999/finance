'use client';

import { useFormatCurrency } from '@/hooks/use-format-currency';
import { sizes, variants } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { HandCoins, Landmark, Pencil, PiggyBank, Wallet } from 'lucide-react';
import Link from 'next/link';
import TransactionItemRemoveButton from './transaction-item-remove-button';

type TransactionItemProps = {
  id?: string;
  type: 'Income' | 'Expense' | 'Investment' | 'Saving';
  amount: number;
  category?: string;
  description?: string;
  onRemoved?: () => void;
};

const TransactionItem = ({
  id,
  type,
  amount,
  category,
  description,
  onRemoved,
}: TransactionItemProps) => {
  const typesMap = {
    Income: {
      icon: HandCoins,
      colors: 'text-green-500 dark:text-green-400',
    },
    Expense: {
      icon: Wallet,
      colors: 'text-red-500 dark:text-red-400',
    },
    Saving: {
      icon: PiggyBank,
      colors: 'text-indigo-500 dark:text-indigo-400',
    },
    Investment: {
      icon: Landmark,
      colors: 'text-yellow-500 dark:text-yellow-400',
    },
  };

  const IconComponent = typesMap[type].icon;
  const colors = typesMap[type].colors;

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className='flex w-full items-center'>
      <div className='mr-4 flex grow items-center'>
        <IconComponent className={cn(colors, 'mr-2 hidden h-4 w-4 sm:block')} />
        <span>{description}</span>
      </div>
      <div className='hidden min-w-[150px] items-center md:flex'>
        {category && (
          <div className='rounded-md bg-gray-700 px-2 py-0.5 text-xs text-gray-100 dark:bg-gray-100 dark:text-black'>
            {category}
          </div>
        )}
      </div>
      <div className='min-w-[70px] text-right'>{formattedAmount}</div>
      <div className='flex min-w-[100px] justify-end'>
        <Link
          href={`/dashboard/transaction/${id}/edit`}
          className={cn(variants['ghost'], sizes['xs'])}
        >
          <Pencil className='h-4 w-4' />
        </Link>
        {id && onRemoved && (
          <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
