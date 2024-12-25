import { Bca, Bni, Mandiri } from '@/components/assets/banks';
import Button from '@/components/button';
import Input from '@/components/input';
import Label from '@/components/label';
import PageHeader from '@/components/page-header';
import Separator from '@/components/separator';
import Skeleton from '@/components/skeleton';

import TransactionItem from '@/components/transaction-item';
import TransactionSummaryItem from '@/components/transaction-summary-item';
import Trend from '@/components/trend';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
};

const PlaygroundPage = () => {
  return (
    <main className='container mx-auto mb-44 mt-28 max-w-4xl space-y-8'>
      <h1 className='mt-8 text-4xl'>Playground</h1>

      <div>
        <h2 className='mb-4 font-mono text-lg'>Page Header</h2>
        <Separator />
        <div>
          <PageHeader />
        </div>
      </div>

      <div>
        <h2 className='mb-4 font-mono text-lg'>Trend</h2>
        <Separator />
        <div className='flex space-x-8'>
          <Trend type='Income' amount={1000} prevAmount={900} />
          <Trend type='Expense' amount={12000} prevAmount={10000} />
          <Trend type='Investment' amount={7000} prevAmount={11100} />
          <Trend type='Saving' amount={500} prevAmount={950} />
        </div>
      </div>

      <div>
        <h2 className='mb-4 font-mono text-lg'>Transaction Item</h2>
        <Separator />
        <div className='space-y-4'>
          <TransactionItem type='Income' description='Salary' amount={2000} />
          <TransactionItem
            type='Expense'
            category='food'
            description='Going out to eat'
            amount={29}
          />
          <TransactionItem
            type='Saving'
            description='For children'
            amount={500}
          />
          <TransactionItem
            type='Investment'
            description='In Microsoft'
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 font-mono text-lg'>Transaction Summary Item</h2>
        <Separator />
        <div className='space-y-4'>
          <TransactionSummaryItem date='2024-05-01' amount={3500} />
          <Separator />
          <TransactionItem type='Income' description='Salary' amount={2000} />
          <TransactionItem
            type='Expense'
            category='food'
            description='Going out to eat'
            amount={29}
          />
          <TransactionItem
            type='Saving'
            description='For children'
            amount={500}
          />
          <TransactionItem
            type='Investment'
            description='In Microsoft'
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 font-mono text-lg'>Buttons</h2>
        <Separator />
        <div className='space-x-4'>
          <Button>default</Button>
          <Button variant='outline'>outline</Button>
          <Button variant='ghost'>ghost</Button>
          <Button size='xs'>extra small</Button>
          <Button size='sm'>small</Button>
          <Button size='lg'>Large</Button>
        </div>
      </div>

      <div className='w-full'>
        <h2 className='mb-4 font-mono text-lg'>Forms</h2>
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='input' className='mb-1'>
              Input
            </label>

            <Input type='text' placeholder='input' id='input' />
          </div>

          {/* <div>
            <Label className='mr-2' htmlFor='select'>
              Select
            </Label>
            <Select className='w-full rounded-md border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950'>
              <option value='option1'>option 1</option>
              <option value='option2'>option 2</option>
              <option value='option3'>option 3</option>
            </Select>
          </div> */}
          <div>
            <Label className='mr-2' htmlFor='select'>
              Shadcn Select
            </Label>
            <Select>
              <SelectTrigger className=' '>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='option1' className='flex items-center'>
                  <div className='flex items-center gap-2'>
                    <Bca /> Bca
                  </div>
                </SelectItem>
                <SelectItem value='option2'>
                  <div className='flex items-center gap-2'>
                    <Bni /> Bni
                  </div>
                </SelectItem>
                <SelectItem value='option3'>
                  <div className='flex items-center gap-2'>
                    <Mandiri /> Mandiri
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center'>
            <Input type='checkbox' id='terms' />

            <Label className='ml-2' htmlFor='terms'>
              Accept terms
            </Label>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h2 className='mb-4 font-mono text-lg'>Skeleton Loading</h2>
        <Separator />
        <div className='space-y-8'>
          <div className='flex space-x-4'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className='space-y-4'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaygroundPage;
