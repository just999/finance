'use client';

import { uploadAvatar } from '@/actions/avatar-actions';
import AlertError from '@/components/alert-error';
import AlertSuccess from '@/components/alert-success';
import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';
import { useActionState } from 'react';

export type AvatarPageProps = {
  message?: string;
  error?: boolean;
  // avatar?: File;
};

const initialState = {
  message: '',
  error: false,
  // avatar: undefined,
};

const AvatarPage = () => {
  const [state, formAction] = useActionState(uploadAvatar, initialState);
  return (
    <>
      <h1 className='mb-8 text-4xl font-semibold'>Avatar</h1>
      <form action={formAction} className='space-y-4'>
        {state?.error && <AlertError state={state} />}
        {!state?.error && state?.message && state?.message?.length > 0 && (
          <AlertSuccess state={state} />
        )}
        <Input type='file' name='avatar' id='avatar' required />

        <SubmitButton type='submit'>Upload Avatar</SubmitButton>
      </form>
    </>
  );
};

export default AvatarPage;
