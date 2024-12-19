// 'use client';

// import { sizes, variants } from '@/lib/helpers';
// import { cn } from '@/lib/utils';

// type Variant = 'default' | 'outline' | 'ghost';
// type Size = 'base' | 'xs' | 'sm' | 'lg';

// type ButtonProps = {
//   children: React.ReactNode;
//   variant?: Variant;
//   size?: Size;
//   type?: 'submit' | 'button';
//   className?: string;
//   onClick?: () => void;
// };

// const Button = ({
//   children,
//   className,
//   type,
//   variant = 'default',
//   size = 'base',
//   onClick,
//   ...props
// }: ButtonProps) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       {...props}
//       className={cn(
//         variant ? variants[variant] : variants['default'],
//         size ? sizes[size] : sizes['base']
//       )}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

'use client';

import { sizes, variants } from '@/lib/helpers';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  size?: 'base' | 'xs' | 'sm' | 'lg';
  // className?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']} ${props.className}`}
    >
      {props.children}
    </button>
  );
}
