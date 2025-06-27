'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AboutUsSectionProps {
  heading?: string;
  imageSrc: string;
  topText: string;
  bottomText: string;
  link?: string;
}

const AboutUsSection = ({
  heading = 'About us',
  imageSrc,
  topText,
  bottomText,
  link = '/about',
}: AboutUsSectionProps) => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(link);
  };

  return (
    <section className="relative w-full h-[500px] text-white overflow-hidden">
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white text-black px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <button
          onClick={handleLearnMore}
          className="text-[16px] underline hover:text-blue-600 transition"
          aria-label="Learn more"
        >
          Learn More
        </button>
      </div>

      {/* Background Image */}
      <Image
        src={imageSrc}
        alt="About background"
        fill
        className="object-cover z-0"
        quality={100}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Top Text */}
      <div className="absolute top-28 left-4 md:left-8 right-4 max-w-md z-20">
        <p className="text-sm md:text-base leading-relaxed">{topText}</p>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-12 right-4 md:right-8 left-4 md:left-auto max-w-md text-right z-20">
        <p className="text-sm md:text-base leading-relaxed">{bottomText}</p>
      </div>
    </section>
  );
};

export default AboutUsSection;
