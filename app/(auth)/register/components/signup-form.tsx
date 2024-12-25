'use client';

import { register } from '@/actions/auth-actions';
import AlertSuccess from '@/components/alert-success';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { RegisterSchema, registerSchema } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

type SignupFormProps = {
  message: string;
  error: boolean;
};

const initialState: SignupFormProps = {
  message: '',
  error: false,
};

const SignupForm = () => {
  const [result, setResult] = useState<SignupFormProps>(initialState);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (data: RegisterSchema) => {
    const res = await register(data);
    // const res = await register({
    //   email: 'sgs@sdgf.com',
    //   password: '12311111',
    //   passwordConfirm: '111111111',
    // });
    if (res) setResult(res);

    if (res?.error) {
      form.setError('email', {
        message: res?.message,
      });
    }
  };
  return form.formState.isSubmitSuccessful ? (
    <AlertSuccess state={result} type='auth' />
  ) : (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register for New Member</CardDescription>
      </CardHeader>
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
                      <Input
                        {...field}
                        type='email'
                        suffix={
                          <MailIcon
                            size={18}
                            className='absolute right-2 text-zinc-400'
                          />
                        }
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} type='password' />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full'>Register</Button>
            </fieldset>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex-col space-y-1'>
        <div className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/login' className='underline'>
            Login
          </Link>{' '}
        </div>
        {/* <div className='text-sm text-muted-foreground'>
          Forgot password?{' '}
          <Link href='/password-reset' className='underline'>
            reset password
          </Link>{' '}
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
