import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChangePasswordForm from './change-password-form';

type ChangePasswordPageProps = unknown;

const ChangePasswordPage = () => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
};

export default ChangePasswordPage;
