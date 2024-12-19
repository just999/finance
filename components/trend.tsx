'use client';

import { useFormatCurrency } from '@/hooks/use-format-currency';
import { ArrowDownLeft, ArrowUpRight, Percent } from 'lucide-react';
import { useMemo } from 'react';

type TrendProps = {
  type: 'Income' | 'Expense' | 'Investment' | 'Saving';
  amount: number;
  prevAmount?: number;
};

const Trend = ({ type, amount, prevAmount }: TrendProps) => {
  const colorClasses = {
    Income: 'text-green-700 dark:text-green-300',
    Expense: 'text-red-700 dark:text-red-300',
    Investment: 'text-indigo-700 dark:text-indigo-300',
    Saving: 'text-yellow-700 dark:text-yellow-300',
  };
  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (!prevAmount || !amount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount!).toFixed(0),
    [amount, prevAmount]
  );
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);

  const formattedAmount = useFormatCurrency(amount);
  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className='mb-2 text-2xl font-semibold text-black dark:text-white'>
        {amount ? formatCurrency(amount) : formatCurrency(0)}
      </div>
      <div className='flex items-center justify-center space-x-1 text-nowrap text-xs'>
        {Number(percentageChange) <= 0 && (
          <ArrowDownLeft size={10} className='text-red-700 dark:text-red-300' />
        )}

        {Number(percentageChange) > 0 && (
          <ArrowUpRight
            size={10}
            className='text-green-700 dark:text-green-300'
          />
        )}

        <div className='flex items-center'>
          {percentageChange} &nbsp; <Percent size={10} /> &nbsp; vs last period
        </div>
      </div>
    </div>
  );
};

export default Trend;
