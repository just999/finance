'use client';

import { changePassword } from '@/actions/auth-actions';
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
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

const ChangePasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: ChangePasswordSchema) => {
    console.log(data);
    const res = await changePassword(data);
    if (res.error) {
      form.setError('root', {
        message: res.message,
      });
    } else {
      toast({
        title: 'Change Password',
        description: 'Your password successfully changed',
        className: 'bg-green-500 text-white',
      });
      form.reset();
      router.push('/my-account');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className='space-y-2'>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <Button className='w-full'>Change password</Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
