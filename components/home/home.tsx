'use client';

import AOS from 'aos';
import { useEffect } from 'react';
import AnalyticsFeature from './analytics-feature/analytics-feature';
import Features from './features/features';
import Hero from './hero/hero';
import Offer from './offer/offer';
import Price from './price/price';
import Reviews from './review/reviews';
import WhyChoose from './why-choose/why-choose';

import 'aos/dist/aos.css';

type HomeProps = unknown;

const Home = () => {
  useEffect(() => {
    const initAOS = async () => {
      await import('aos');

      AOS.init({
        duration: 1000,
        easing: 'ease',
        once: true,
        anchorPlacement: 'top-bottom',
      });
    };
    initAOS();
  }, []);
  return (
    <div className='overflow-hidden'>
      <Hero />
      <WhyChoose />
      <AnalyticsFeature />
      <Features />
      <Reviews />
      <Price />
      <Offer />
    </div>
  );
};

export default Home;
