'use client';

import { activate2fa, disable2fa, get2faSecret } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

type TwoFactorAuthFormProps = {
  twoFactorActivated: boolean;
};

const TwoFactorAuthForm = ({ twoFactorActivated }: TwoFactorAuthFormProps) => {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleEnableClick = async () => {
    setStep(2);
    const res = await get2faSecret();
    if (res.error) {
      toast({
        variant: 'destructive',
        title: res.message,
      });
      return;
    }

    setStep(2);
    setCode(res.twoFactorSecret ?? '');
  };
  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await activate2fa(otp);

    if (res?.error) {
      toast({
        variant: 'destructive',
        title: res.message,
      });
      return;
    }

    toast({
      className: 'bg-green-500 text-white',
      title: 'Two-Factor Authentication has been enabled',
    });

    setIsActivated(true);
  };

  const handleDisable2faClick = async () => {
    await disable2fa();
    toast({
      className: 'bg-green-500 text-white',
      title: 'Two-Factor Authentication has been disabled',
    });

    setIsActivated(false);
  };

  return (
    <div>
      {!!isActivated && (
        <Button variant='destructive' onClick={handleDisable2faClick}>
          Disable Two-Factor Authentication
        </Button>
      )}
      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={handleEnableClick}>
              Enabled Two-Factor Authentication
            </Button>
          )}
          {step === 2 && (
            <div>
              <p className='py-2 text-xs text-muted-foreground'>
                Scan the QR code below in google authenticator app to activate
                Two-Factor Authentication
              </p>
              <QRCodeSVG value={code} />
              <Button onClick={() => setStep(3)} className='my-2 w-full'>
                I Have scanned the QR code
              </Button>
              <Button
                onClick={() => setStep(1)}
                variant='outline'
                className='w-full'
              >
                Cancel
              </Button>
            </div>
          )}

          {step === 3 && (
            <form
              onSubmit={handleOTPSubmit}
              className='flex flex-col space-y-2'
            >
              <p className='text-xs text-muted-foreground'>
                Please enter the one-time passcode from the Google Authenticator
                App
              </p>
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
                Submit and Activate
              </Button>
              <Button onClick={() => setStep(2)} variant='outline'>
                Cancel
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthForm;
