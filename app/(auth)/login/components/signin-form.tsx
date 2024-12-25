'use client';

import { loginWithCredentials, preLoginCheck } from '@/actions/auth-actions';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/hooks/use-toast';
import { SigninSchema, signinSchema } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SigninFormProps = unknown;

const SigninForm = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const { update } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = async (data: SigninSchema) => {
    console.log('🚀 ~ handleSubmit ~ data:', data);

    const preLoginCheckRes = await preLoginCheck({
      email: data.email,
      password: data.password,
    });

    if (preLoginCheckRes.error) {
      form.setError('root', {
        message: preLoginCheckRes.message,
      });
      return;
    }

    if (preLoginCheckRes.twoFactorActivated) {
      setStep(2);
    } else {
      const res = await loginWithCredentials(data);

      if (res.error) {
        form.setError('root', {
          message: res.message,
        });
      } else {
        await update();
        router.refresh();
        router.push('/dashboard');
      }
    }
  };

  const email = form.getValues('email');

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await loginWithCredentials({
      email: form.getValues('email'),
      password: form.getValues('password'),
      token: otp,
    });

    if (res.error) {
      toast({
        title: res.message,
        variant: 'destructive',
      });
    } else {
      await update();
      router.refresh();
      router.push('/my-account');
    }
  };

  console.log('🚀 ~ SigninForm ~ update:', update);
  return (
    <>
      {step === 1 && (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back</CardDescription>
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
                  {!!form.formState.errors.root?.message && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                  <Button className='w-full'>Signin</Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex-col space-y-1'>
            <div className='text-sm text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='underline'>
                Register
              </Link>{' '}
            </div>
            <div className='text-sm text-muted-foreground'>
              Forgot password?{' '}
              <Link
                href={`/password-reset${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className='underline'
              >
                reset password
              </Link>{' '}
            </div>
          </CardFooter>
        </Card>
      )}
      {step === 2 && (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>One-Time Passcode</CardTitle>
            <CardDescription>
              Enter the one-time passcode for WebDevEducation displayed in your
              Google Authenticator app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOTPSubmit} className='flex flex-col gap-2'>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button disabled={otp.length !== 6} type='submit'>
                Verify OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SigninForm;
