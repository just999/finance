import * as React from 'react';

const Dribble: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className='lucide lucide-dribbble'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx='12' cy='12' r='10'></circle>
    <path d='M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32'></path>
    <path d='M8.56 2.75c4.37 6 6 9.42 8 17.72'></path>
  </svg>
);

export default Dribble;
