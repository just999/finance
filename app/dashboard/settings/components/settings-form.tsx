'use client';

import { updateSettings } from '@/actions/setting-actions';
import AlertError from '@/components/alert-error';
import AlertSuccess from '@/components/alert-success';
import DateRangeSelect from '@/components/date-range-select';
import FormError from '@/components/form-error';
import Input from '@/components/input';
import Label from '@/components/label';
import SubmitButton from '@/components/submit-button';
import { UserMetadataProps } from '@/types/type';

import { useActionState } from 'react';

type SettingsFormProps = {
  defaults?: UserMetadataProps;
};

const initialState: UserMetadataProps = {
  fullName: '',
  defaultView: 'last24hours',
  message: '',
  error: false,
  errors: undefined,
};

const SettingsForm = ({ defaults }: SettingsFormProps) => {
  const [state, formAction] = useActionState(updateSettings, initialState);
  return (
    <form className='space-y-4' action={formAction}>
      {state?.error && <AlertError state={state} type='noAuth' />}
      {!state?.error && state?.message && state?.message?.length > 0 && (
        <AlertSuccess state={state} type='noAuth' />
      )}
      <Label htmlFor='fullName'>User Full Name</Label>
      <Input
        type='text'
        name='fullName'
        id='fullName'
        placeholder='user full name'
        defaultValue={defaults?.fullName}
        required
      />

      {state?.errors?.fullName?.map((error) => (
        <FormError key={`fullName-${error}`} errors={error} />
      ))}
      <Label htmlFor='defaultView'>Default Transactions View</Label>
      <DateRangeSelect
        name='defaultView'
        id='defaultView'
        defaultValue={defaults?.defaultView}
      />
      {state?.errors?.defaultView?.map((error) => (
        <FormError key={`defaultView-${error}`} errors={error} />
      ))}

      <SubmitButton type='submit'>Upload Setting</SubmitButton>
    </form>
  );
};

export default SettingsForm;
