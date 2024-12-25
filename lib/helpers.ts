import Dribble from '@/components/assets/social/dribble';
import Facebook from '@/components/assets/social/facebook';
import Instagram from '@/components/assets/social/instagram';
import Tiktok from '@/components/assets/social/tiktok';
import Whatsapp from '@/components/assets/social/whatsapp';
import X from '@/components/assets/social/x';
import {
  BookOpen,
  Clock,
  Computer,
  Headphones,
  InfinityIcon,
  Laptop,
  Layers,
  Mail,
  MapPinned,
  PhoneCall,
  Settings,
  ShieldIcon,
  TabletSmartphone,
} from 'lucide-react';

export type Variant = 'default' | 'outline' | 'ghost' | 'danger';
export type Size = 'base' | 'xs' | 'sm' | 'lg';

export const variants: Record<Variant, string> = {
  default:
    'bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50',
  outline:
    'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50',
  ghost:
    'rounded-md bg-white dark:bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50',
  danger:
    'bg-red-500 text-white dark:bg-red-500 rounded-md hover:bg-red-700 dark:hover:bg-red-700 disabled:opacity-50',
};
export const sizes: Record<Size, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  base: 'text-base px-4 py-2',
  lg: 'text-lg px-4 py-2',
};

export const types: Array<'Income' | 'Expense' | 'Investment' | 'Saving'> = [
  'Income',
  'Expense',
  'Investment',
  'Saving',
];

export const categories = [
  'Housing',
  'Transport',
  'Health',
  'Food',
  'Education',
  'Other',
];

export const dateRangeValues = [
  'last24hours',
  'last7days',
  'last30days',
  'last12months',
] as const;

export const navLinks = [
  {
    id: 1,
    url: '#',
    label: 'Home',
  },
  {
    id: 2,
    url: '#',
    label: 'About',
  },
  {
    id: 3,
    url: '#',
    label: 'Feature',
  },
  {
    id: 4,
    url: '#',
    label: 'Testimonial',
  },
  {
    id: 5,
    url: '#',
    label: 'Blog',
  },
  {
    id: 6,
    url: '#',
    label: 'Contact',
  },
];

export const whyChooseCard = [
  {
    image: '/images/i1.png',
    title: 'Create Free Account',
    linkText: 'Start Earning',
  },
  {
    image: '/images/i2.png',
    title: 'Monitor User Analytics',
    linkText: 'Sign up your store',
  },
  {
    image: '/images/i3.png',
    title: 'Safe & Trusted',
    linkText: 'Get The App',
  },
  {
    image: '/images/i4.png',
    title: 'Fast Customer Support',
    linkText: 'Learn More',
  },
];

export const analyticsFeature = [
  { content: 'Chat prompt module supported' },
  { content: 'Enjoy unlimited features by paid plan' },
  { content: 'Manage ultimate conversation' },
];

export const features = [
  {
    icon: Layers,
    class: 'text-red-500',
    text: '50+ Unique Design Block',
  },
  {
    icon: Laptop,
    class: 'text-sky-500',
    text: 'Multiple Layouts',
  },
  {
    icon: TabletSmartphone,
    class: 'text-yellow-500',
    text: 'Mobile First Design',
  },
  {
    icon: Computer,
    class: 'text-purple-500',
    text: 'Fully  Responsive',
  },
  {
    icon: Settings,
    class: 'text-teal-500',
    text: 'Customizable Features',
  },
  {
    icon: Headphones,
    class: 'text-green-500',
    text: 'Human Support',
  },
  {
    icon: InfinityIcon,
    class: 'text-pink-500',
    text: 'Lifetime Update',
  },
  {
    icon: BookOpen,
    class: 'text-indigo-500',
    text: 'Rich Documentation',
  },
  {
    icon: ShieldIcon,
    class: 'text-orange-500',
    text: 'Enhanced Security',
  },
];

export const reviewCard = [
  {
    name: 'Jessie Doe',
    image: '/images/c1.png',
    rating: 4,
    position: 'Web Developer',
  },
  {
    name: 'John Doe',
    image: '/images/c2.png',
    rating: 3.5,
    position: 'Web Engineer',
  },
  {
    name: 'Jessie Doe too',
    image: '/images/c1.png',
    rating: 5,
    position: 'Fullstack Developer',
  },
  {
    name: 'John Doe too',
    image: '/images/c2.png',
    rating: 4.5,
    position: 'AI Specialist',
  },
];

export type ServicePlanProps = {
  service: string;
};

export const servicesPlan = [
  {
    service: 'Unlimited Connection',
  },
  {
    service: 'Basic Actions & Triggers',
  },
  {
    service: 'Draft Payments',
  },
  {
    service: 'Unlimited Flows and Supports',
  },
  {
    service: 'Lifetime Updates',
  },
];

export const priceCard = [
  {
    price: 15,
    plan: 'Starter',
    services: servicesPlan,
    aos: {
      'data-aos': 'fade-up',
      'data-aos-anchor-placement': 'top-center',
      'data-aos-delay': '',
    },
  },
  {
    price: 45,
    plan: 'Business',
    services: servicesPlan,
    aos: {
      'data-aos': 'fade-up',
      'data-aos-anchor-placement': 'top-center',
      'data-aos-delay': '100',
    },
  },
];

export const footerAboutUs = [
  {
    dir: 'Support Center',
  },
  {
    dir: 'Customer Support',
  },
  {
    dir: 'About Us',
  },
  {
    dir: 'Copyright',
  },
  {
    dir: 'Popular Campaign',
  },
];
export const footerOurInformationLinks = [
  {
    link: 'Return Policy',
  },
  {
    link: 'Privacy Policy',
  },
  {
    link: 'Term & Condition',
  },
  {
    link: 'Sitemap',
  },
  {
    link: 'Store Hours',
  },
];
export const footerContactInfoLinks = [
  {
    icon: MapPinned,
    link: 'Amsterdam, Netherlands',
  },
  {
    icon: PhoneCall,
    link: '+01 23454 64465',
  },
  {
    icon: Clock,
    link: '7 days - 8am - 10am',
  },
  {
    icon: Mail,
    link: 'info@cat.com',
  },
];

export const socialMedia = [
  { icon: Facebook, name: 'Facebook' },
  { icon: Whatsapp, name: 'Whatsapp' },
  { icon: Dribble, name: 'Dribble' },
  { icon: Instagram, name: 'Instagram' },
  { icon: X, name: 'X' },
  { icon: Tiktok, name: 'Tiktok' },
];
