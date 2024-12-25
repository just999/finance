export type TransactionListProps = {
  id?: string;
  amount: number;
  type: 'Income' | 'Expense' | 'Investment' | 'Saving';
  description?: string;
  category:
    | 'Housing'
    | 'Transport'
    | 'Health'
    | 'Food'
    | 'Education'
    | 'Other'
    | '';
  created_at: string;
};

export type UserMetadataProps = {
  avatar?: string;
  avatar_Url?: string;
  email?: string;
  fullName?: string;
  defaultView?: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
  email_verified?: boolean;
  phone_verified?: boolean;
  sub?: string;
  message?: string;
  error?: boolean;
  errors?: {
    fullName?: string[];
    defaultView?: string[];
  };
};

export type AuthActionState = {
  message?: string;
  errors?: boolean;
};

export type UpdatePasswordProps = {
  token?: string;
  password?: string;
  passwordConfirm?: string;
};
