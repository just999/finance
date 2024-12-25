'use client';

import { resetPassword } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type PasswordResetFormProps = unknown;

const PasswordResetForm = () => {
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      email: decodeURIComponent(searchParams.get('email') ?? ''),
    },
  });

  const handleSubmit = async (data: ResetPasswordSchema) => {
    await resetPassword(data);
  };
  return form.formState.isSubmitSuccessful ? (
    <CardContent>password reset sent to {form.getValues('email')}</CardContent>
  ) : (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className='space-y-2'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!!form.formState.errors.root?.message && (
              <FormMessage>{form.formState.errors.root.message}</FormMessage>
            )}
            <Button className='w-full'>Submit</Button>
          </fieldset>
        </form>
      </Form>
    </CardContent>
  );
};

export default PasswordResetForm;
