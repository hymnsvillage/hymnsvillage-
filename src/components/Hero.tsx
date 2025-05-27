import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import Button from "./ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
    <main className="min-h-screen bg-black text-white">

      {/* Background image */}
        <Image
          src="/hymns-hero.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-10 w-full h-full"
          style={{ filter: "blur(2px)" }} // Optional: Add a blur effect to the background image
        />
      

      {/* Hero Section */}
      <div className="relative flex flex-col px-8 md:px-24 py-20 text-white">
        <div className="max-w-xl z-20 mt-16 flex flex-col items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-medium leading-none mb-4">
            Unveil Sacred Melodies.<br />Connect Through Faith.
          </h1>
          <p className="text-slate-300 text-[12px] mb-6">
            Explore a curated digital sanctuary of English and Efik hymns, alongside insightful articles
            that resonate with the heart of faith. Join a vibrant community where shared devotion
            finds harmonious expression.
          </p>
          <div className="flex justify-between gap-8">
            <Button className="border-none">
              <Link 
                href='/hymnals' 
              >
                Discover Hymnals
              </Link>
            </Button>
            <Button className="bg-transparent border border-white text-white hover:border-none">
              <Link 
                href='/signup' 
              >
                Create Account
              </Link>
            </Button>
          </div>
        </div>


        {/* Social icons */}
        
        <div className="w-full relative flex items-start z-10 mt-28">
          <div className="absolute md:bottom-8 md:right-8">
            <SocialLinks />
          </div>
        </div>
      </div>
    </main>
    </section>
  );
}

