import Image from 'next/image';

type WhyChooseCardProps = {
  image: string;
  title: string;
  linkText: string;
};
/* cSpell:disable */
export const lorem =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, libero?';
/* cSpell:enable */

const WhyChooseCard = ({ image, title, linkText }: WhyChooseCardProps) => {
  return (
    <div>
      <Image
        src={image}
        alt={image}
        width={80}
        height={80}
        className='mx-auto object-contain'
      />
      <h1 className='my-5 text-center text-lg font-semibold text-gray-800 dark:text-gray-400'>
        {title}
      </h1>
      <p className='mb-7 text-center text-sm font-medium text-gray-600 dark:text-gray-200'>
        {' '}
        {lorem}
      </p>
      <p className='cursor-pointer text-center font-semibold text-sky-700 transition-all duration-200 hover:text-sky-800'>
        {linkText} &#8594;
      </p>
    </div>
  );
};

export default WhyChooseCard;
