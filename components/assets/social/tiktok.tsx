import * as React from 'react';

const Tiktok: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 50 50'
    {...props}
  >
    <g
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    >
      <path d='M9 45h32c2.211 0 4-1.789 4-4V9c0-2.211-1.789-4-4-4H9C6.789 5 5 6.789 5 9v32c0 2.211 1.789 4 4 4'></path>
      <path
        strokeMiterlimit='10'
        d='M30.058 11h-4.016L26 30.594c0 2.404-2.123 4.298-4.527 4.298a4.351 4.351 0 1 1 0-8.704c.181 0 .352.032.527.053v-4.202c-.175-.011-.349-.027-.527-.027A8.527 8.527 0 1 0 30 30.54V19.003a7.49 7.49 0 0 0 6.269 3.388 8 8 0 0 0 .69-.035v-4.671A7.49 7.49 0 0 1 30.058 11'
        clipRule='evenodd'
      ></path>
    </g>
  </svg>
);

export default Tiktok;
