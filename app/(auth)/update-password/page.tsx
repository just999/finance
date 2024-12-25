import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/lib/db/drizzle';
import { passwordResetTokens } from '@/lib/db/passwordResetTokenSchema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import UpdatePasswordForm from './update-password-form';

type UpdatePasswordPageProps = {
  searchParams: {
    token?: string;
  };
};

const UpdatePasswordPage = async ({
  searchParams,
}: UpdatePasswordPageProps) => {
  let tokenIsValid = false;
  const { token } = await searchParams;

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      tokenIsValid = true;
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>
            {tokenIsValid
              ? 'Update Password'
              : 'password reset link is invalid or expired!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid ? (
            <UpdatePasswordForm token={token ?? ''} />
          ) : (
            <Link href='/password-reset' className='underline'>
              Request another password reset link{' '}
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdatePasswordPage;
