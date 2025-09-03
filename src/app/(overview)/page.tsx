import AboutUsSection from '@/components/About'
import InsightsSection from '@/components/Blog';
import FeaturedHymns from '@/components/FeaturedHymns';
import HeroSection from '@/components/Hero';
import React from 'react';

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedHymns />
      <InsightsSection />
      <AboutUsSection />
    </div>
  )
}

export default Home;
