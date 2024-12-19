'use client';

import { useState } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import { categories, types } from '@/lib/helpers';
import {
  transactionsSchema,
  TransactionsSchema,
} from '@/schemas/transactions-schema';
import { useForm } from 'react-hook-form';

import {
  createTransaction,
  updateTransaction,
} from '@/actions/transaction-action';
import FormError from '@/components/form-error';
import { TransactionListProps } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

type TransactionFormProps = {
  initialData?: TransactionListProps;
};

const TransactionForm = ({ initialData }: TransactionFormProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastError, setLastError] = useState<string | undefined>(undefined);

  const newData = {
    id: initialData?.id,
    amount: initialData?.amount,
    type: initialData?.type,
    description: initialData?.description,
    category: initialData?.category,
    created_at: initialData?.created_at.toString().split('T')[0],
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionsSchema>({
    resolver: zodResolver(transactionsSchema),
    mode: 'onTouched',
    defaultValues: newData ?? {
      created_at: new Date().toISOString().split('T')[0],
    },
  });

  const type = watch('type');
  const editing = Boolean(initialData);

  const onSubmit = async (data: TransactionListProps) => {
    setIsSaving(true);
    setLastError(undefined);

    try {
      if (editing && initialData?.id) {
        await updateTransaction(initialData?.id, data);
      } else {
        await createTransaction(data);
      }
      router.push('/dashboard');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'An unknown error occurred';
      setLastError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label className='mb-1'>Type</Label>
          <Select
            {...register('type', {
              onChange: (e) => {
                if (e.target.value !== 'Expense') {
                  setValue('category', '');
                }
              },
            })}
          >
            <option value=''>Select a type</option>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
          <FormError errors={errors.type?.message} />
        </div>
        <div>
          <Label className='mb-1'>Category</Label>
          <Select {...register('category')} disabled={type !== 'Expense'}>
            <option value=''>Select a category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </Select>
          <FormError errors={errors.category?.message} />
        </div>

        <div>
          <Label className='mb-1'> Date</Label>
          <Input
            type='datetime-local'
            {...register('created_at')}
            disabled={editing}
          />
          {/* {errors.created_at && (
            <p className='mt-1 text-red-500'>{errors.created_at.message}</p>
          )} */}
          <FormError errors={errors.created_at?.message} />
        </div>

        <div>
          <Label className='mb-1'> Amount</Label>
          <Input type='number' {...register('amount')} />
          {/* {errors.amount && (
            <p className='mt-1 text-red-500'>{errors.amount.message}</p>
          )} */}
          <FormError errors={errors.amount?.message} />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <Label className='mb-1'> Description</Label>
          <Input type='text' {...register('description')} />
          {/* {errors.description && (
            <p className='mt-1 text-red-500'>{errors.description.message}</p>
          )} */}

          <FormError errors={errors.description?.message} />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div>{lastError && <FormError errors={lastError} />}</div>
        <Button type='submit' disabled={isSaving}>
          Save
        </Button>
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};

export default TransactionForm;
