import AboutUsSection from '@/components/About'
import InsightsSection from '@/components/Blog';
import HeroSection from '@/components/Hero';
import React from 'react';

interface Article {
  title: string;
  category: string;
  author: string;
  time: string;
  image: string;
}

const featured: Article[] = [
  {
    title: 'Explore Nature With These Tranquil Trails',
    category: 'Travel',
    author: 'Hudson',
    time: '1 day ago',
    image: '/Group 15.png',
  },
  {
    title: 'Explore Nature With These Tranquil Trails',
    category: 'Travel',
    author: 'Hudson',
    time: '1 day ago',
    image: '/Frame 102.png',
  },
  {
    title: 'Explore Nature With These Tranquil Trails',
    category: 'Travel',
    author: 'Hudson',
    time: '1 day ago',
    image: '/ Group 13.png',
  },
  {
    title: 'Explore Nature With These Tranquil Trails',
    category: 'Travel',
    author: 'Hudson',
    time: '1 day ago',
    image: '/Group 12.png',
  }, {
    title: 'Explore Nature With These Tranquil Trails',
    category: 'Travel',
    author: 'Hudson',
    time: '1 day ago',
    image: '/Group 14.png',
  },
  
  // Add more articles as needed
];

const recent: Article[] = [
  {
    title: 'The Future of AI in Everyday Life',
    category: 'Technology',
    author: 'Hudson',
    time: '2 days ago',
    image: '/Rectangle 2.png',
  },
  {
    title: 'The Future of AI in Everyday Life',
    category: 'Technology',
    author: 'Hudson',
    time: '2 days ago',
    image: '/Rectangle 13.png',
  },
  {
    title: 'The Future of AI in Everyday Life',
    category: 'Technology',
    author: 'Hudson',
    time: '2 days ago',
    image: '/Rectangle 9.png',
  },
  {
    title: 'The Future of AI in Everyday Life',
    category: 'Technology',
    author: 'Hudson',
    time: '2 days ago',
    image: '/Rectangle 17.png',
  },
  // Add more recent articles
];

function Home() {
  return (
    <div>
      <HeroSection />
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
      <AboutUsSection />
      <InsightsSection featured={featured} recent={recent} />
    </div>
  )
}

export default Home;


