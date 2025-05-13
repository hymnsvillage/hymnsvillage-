import SocialLinks from "@/components/SocialLinks";
import Image from "next/image";
import React from "react";


const AboutPage = () => {
  return (
    <div className=" text-black">
      {/* Hero Banner */}
      <div
        className="relative text-slate-100 py-24 px-4 text-center"
        style={{
          backgroundImage: "url('/about-img.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Our Story: The Vision Behind <br /> the Hymns Village Community
        </h1>
        <h3>Explore a curated digital sanctuary of English and Efik hymns, alongside insightful articles that resonate <br></br>
        with the heart of faith. Join a vibrant community where shared devotions finds harmonious expression.</h3>
        <div className="flex justify-center mt-6">
          <SocialLinks />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-slate-100 py-10 px-4 md:px-20 text-black">
        <h2 className="text-lg font-semibold mb-4">About us</h2>
        <div className="md:flex gap-10">
          <div className="md:w-1/2 border-t-4 border-r-4 border-gray-black p-2 mb-6 md:mb-0">
            <Image
              src="/Mananger-1.png"
              alt="Hymns Village Founder"
              width={500}
              height={100}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-bold text-lg mb-4">MY MISSION</h3>
            <p className="mb-4">
              Looking for a one-stop channel with loads of soul-lifting and classical hymns cutting
              across various climes and times? Search no further, for you are in the right place.
            </p>
            <p className="mb-4">
              At Hymns village you get to find an array of life-changing contents and transforming
              hymns be it for thanksgiving, praise, worship, and every season or phase of life you
              may find yourself coming to you through a melodious voice. With our thousands of
              streams across various platforms, we are undoubtedly doing the Lords’ work of
              soul-winning.
            </p>
            <p className="mb-4">
              Created with the sole intent of returning us back to the consciousness of the existence
              of our maker – the Almighty through acapella rendition of hymns and songs, with words
              of exaltation and constant sharing of the word of God. While connecting believers and
              non-believers alike to the ever-present love of the Father, we have been able to
              gather multitudes across continents glued to our channels and website.
            </p>
          </div>
        </div>

        <div className="mt-10 md:flex gap-10 items-start pt-3">
          <div className="md:w-1/2">
            <h3 className="font-bold text-2xl mb-2 ">
              Our purpose-driven commitment towards enriching lives and winning souls
            </h3>
            <p className="mt-4">
              through a weekly release of new episodes (songs) has been in place since 2020 starting
              from the peak of the infamous global lockdown with countless testimonials and
              encouragements not forgetting the heart-touching feedback from fans around the world to
              mention a few.
            </p>
            <p className="mt-4">
              Hymns Village can be found on multimedia online platforms like Facebook as HYMNS
              VILLAGE, on Instagram as @Hymns_Village, and on Youtube as HYMNS VILLAGE.
            </p>
          </div>
          <div className="md:w-1/2 border-t-4 border-r-4 border-solid-300 p-2 mt-6 md:mt-0">
            <Image
              src="/about-us-img.jpg"
              alt="Additional Hymns Content"
              width={350}
              height={350}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
      {/* Team Section */}
      <div className="bg-slate-100 px-4 md:px-20 py-12 ">
        <h2 className="text-xl font-semibold mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {Array(1)
            .fill([
              {
                name: 'Godsam Peter',
                role: 'Team Lead',
                img: '/avatar.jpg',
              },
              {
                name: 'Christiana Christopher',
                role: 'Content Lead',
                img: '/avatar-2.jpg',
              },
              
              {
                name: 'Prof Okodudu Arew',
                role: 'Advisor',
                img: '/avatar-1.jpg',
              },
              {
                name: 'Prof Okodudu Arew',
                role: 'Advisor',
                img: '/avatar-3.jpg',
              },
              {
                name: 'Prof Okodudu Arew',
                role: 'Advisor',
                img: '/avatar-4.jpg',
              },
              {
                name: 'Prof Okodudu Arew',
                role: 'Advisor',
                img: '/avatar-1.jpg',
              },
            ])
            .flat()
            .map((member, i) => (
              <div key={i} className="flex flex-col items-center">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-700">{member.role}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
