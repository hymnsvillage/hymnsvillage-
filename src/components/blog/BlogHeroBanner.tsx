// components/HeroBannerSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { IoChevronForwardCircle } from "react-icons/io5";

const slides = [
  {
    title: "Riding the Quantum Wave: A Deep Dive into Quantum Computing",
    description:
      "Unravel the mysteries of quantum computing and understand its potential impact on the digital landscape",
    category: "Technology",
    image: "/blog 1.png",
    author: "Hudeen",
    authorImage: "/blog 1.png",
    time: "5 hrs ago",
    comments: 52,
    views: 52,
    likes: 100,
  },
  {
    title: "AI in Medicine: Revolutionizing Healthcare",
    description:
      "How AI is streamlining diagnostics, treatment planning, and patient care.",
    category: "Health Tech",
    image: "/blog 1.png",
    author: "Aisha Bello",
    authorImage: "/blog 1.png",
    time: "3 hrs ago",
    comments: 24,
    views: 88,
    likes: 67,
  },
];

export default function HeroBannerSlider() {
  return (
    <section className="relative w-full h-[500px]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 7000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover opacity-70"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent p-8 flex items-center">
                <div className="max-w-2xl space-y-4 text-white">
                  <span className="bg-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                    {slide.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm text-gray-200">{slide.description}</p>
                  <div className="flex items-center text-sm gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={slide.authorImage}
                        alt={slide.author}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <span className="font-medium">{slide.author}</span>
                    </div>
                    <span className="text-gray-300">{slide.time}</span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <FaComment className="text-sm" /> {slide.comments}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <FaEye className="text-sm" /> {slide.views}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <FaHeart className="text-sm" /> {slide.likes}
                    </span>
                  </div>
                </div>
                {/* Styled Right Arrow Only */}
                <button className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:scale-105 transition">
                  <IoChevronForwardCircle className="drop-shadow-xl text-white/90" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
