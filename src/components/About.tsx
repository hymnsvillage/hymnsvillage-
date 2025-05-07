'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AboutUsSection = () => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push('/about');
  };

  return (
    <section className="relative w-full h-[500px] text-white overflow-hidden">
      {/* Top White Banner */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white text-black px-6 py-4 flex  md:flex-row justify-between items-center md:items-center gap-4 md:gap-0">
        <h2 className="text-xl font-semibold">About us</h2>
        <button
          onClick={handleLearnMore}
          className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
        >
          Learn More
        </button>
      </div>

      {/* Background image */}
      <Image
        src="/frame-1mg.jpg" // Replace with your own image path in /public
        alt="About background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Top-left paragraph */}
      <div className="absolute top-28 left-6 md:left-12 max-w-md z-20">
        <p className="text-sm md:text-base leading-relaxed">
          Looking for a one-stop channel with loads of soul-lifting and classical hymns cutting across various climes and times?
          <br />
          Search no further, for you are in the right place.
        </p>
      </div>

      {/* Bottom-right paragraph */}
      <div className="absolute bottom-12 right-6 md:right-12 max-w-md text-right z-20">
        <p className="text-sm md:text-base leading-relaxed">
          At Hymns village you get to find an array of life-changing contents and transforming hymns — for thanksgiving, praise, worship, or whatever phase of life you’re in — all delivered through a melodious voice.
          <br />
          With our thousands of streams across various platforms, we are undoubtedly doing the Lord’s work of soul-winning.
        </p>
      </div>
    </section>
  );
};

export default AboutUsSection;