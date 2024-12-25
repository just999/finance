'use client';

import { updatePassword } from '@/actions/auth-actions';
import Button from '@/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  PasswordMatchedSchema,
  UpdatePasswordSchema,
  updatePasswordSchema,
} from '@/schemas/auth-schema';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

type UpdatePasswordFormProps = {
  token: string;
};

const UpdatePasswordForm = ({ token }: UpdatePasswordFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: PasswordMatchedSchema) => {
    console.log(data);
    const res = await updatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (res?.tokenInvalid) {
      window.location.reload();
    }

    if (res?.error) {
      form.setError('root', {
        message: res?.message,
      });
    } else {
      toast({
        title: 'Update Password',
        description: 'Your password successfully updated',
        className: 'bg-green-500 text-white',
      });
      // form.reset();
      // router.push('/my-account');
    }
  };

  return form.formState.isSubmitSuccessful ? (
    <div>
      Password is successfully updated.{' '}
      <Link href='/login' className='underline'>
        Click here to Login
      </Link>{' '}
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className='space-y-2'>
          {/* <FormField
            control={form.control}
            name='token'
            render={({ field }) => (
              <FormItem>
                <FormLabel>token</FormLabel>
                <FormControl>
                  <Input {...field} type='text' hidden />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}

          <Button className='w-full'>Update password</Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
