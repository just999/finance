'use client';

import { deleteTransaction } from '@/actions/transaction-action';
import { Loader, X } from 'lucide-react';
import { useState } from 'react';
import Button from './button';

type TransactionItemRemoveButtonProps = {
  id: string;
  onRemoved: () => void;
};

const TransactionItemRemoveButton = ({
  id,
  onRemoved,
}: TransactionItemRemoveButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleDeleteTransaction = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={!confirmed ? 'ghost' : 'danger'}
      size='xs'
      onClick={handleDeleteTransaction}
      aria-disabled={loading}
    >
      {!loading && <X size={14} className='h-4 w-4' />}
      {loading && <Loader className='h-4 w-4 animate-spin' />}
    </Button>
  );
};

export default TransactionItemRemoveButton;
