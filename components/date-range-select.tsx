import Select, { SelectProps } from './select';

type DateRangeSelectProps = SelectProps & {};

const DateRangeSelect = (props: DateRangeSelectProps) => {
  return (
    <Select {...props}>
      <option value=''>Select Date Range</option>
      <option value='last24hours'>Last 24 hours</option>
      <option value='last7days'>Last 7 days</option>
      <option value='last30days'>Last 30 days</option>
      <option value='last12months'>Last 12 months</option>
    </Select>
  );
};

export default DateRangeSelect;
