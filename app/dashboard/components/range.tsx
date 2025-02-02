'use client';

import DateRangeSelect from '@/components/date-range-select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export type RangeProps = {
  defaultView?: 'last24hours' | 'last7days' | 'last30days' | 'last12months';
};

const Range = ({ defaultView }: RangeProps) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { replace } = useRouter();

  const range = searchParams.get('range') ?? defaultView ?? 'last30days';

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    params.set('range', e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return <DateRangeSelect value={range} onChange={handleChange} />;
};

export default Range;
