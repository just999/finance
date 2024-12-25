import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import db from '@/lib/db/drizzle';
import { users } from '@/lib/db/users-schema';
import { eq } from 'drizzle-orm';
import TwoFactorAuthForm from './two-factor-auth-form';

type MyAccountPageProps = unknown;

const MyAccountPage = async () => {
  const session = await auth();

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, parseInt(session?.user?.id as string)));

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email address</Label>
        <div className='text-muted-foreground'>{session?.user?.email}</div>
        <TwoFactorAuthForm
          twoFactorActivated={user.twoFactorActivated ?? false}
        />
      </CardContent>
    </Card>
  );
};

export default MyAccountPage;
