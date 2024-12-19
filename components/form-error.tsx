'use client';

import { FieldError } from 'react-hook-form';

type FormErrorProps = {
  errors?: FieldError | string | undefined;
};

const FormError = ({ errors }: FormErrorProps) => {
  if (errors && typeof errors !== 'string' && 'message' in errors) {
    return <p className='mt-1 text-red-500'>{errors.message}</p>;
  }

  if (typeof errors === 'string') {
    return <p className='mt-1 text-red-500'>{errors}</p>;
  }

  return null;
};

export default FormError;
