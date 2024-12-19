import BaseTrend from '@/components/trend';
import { createClient } from '@/lib/supabase/server';

type TrendProps = {
  type: 'Income' | 'Expense' | 'Investment' | 'Saving';
  range?: string;
};

const Trend = async ({ type, range }: TrendProps) => {
  const supabase = await createClient();

  // const type_arg = type;

  // const range_arg = range;

  // !Fetch data from local json-server
  // const res = await fetch(`${process.env.API_URL}/trends/${type}`);
  // const { amount, prevAmount } = await res.json();

  // rpc stand for remote procedure call
  const { data, error } = await supabase.rpc('calculate_total', {
    range_arg: range,
    type_arg: type,
  });
  if (error) throw new Error('Could not fetch trend data');

  // const amount = data ?? 0;
  const amounts = data[0];

  return (
    <BaseTrend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
};

export default Trend;
