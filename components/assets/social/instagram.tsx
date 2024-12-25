import * as React from 'react';

const Instagram: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className='lucide lucide-instagram'
      viewBox='0 0 24 24'
      {...props}
    >
      <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37M17.5 6.5h.01'></path>
    </svg>
  );
};

export default Instagram;
