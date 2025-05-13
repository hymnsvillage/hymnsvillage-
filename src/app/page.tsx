import AboutUsSection from '@/components/About'
import HeroSection from '@/components/Hero';
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection />
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
      <AboutUsSection />
    </div>
  )
}

export default Home;


