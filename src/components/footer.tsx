'use client';

import { useState } from 'react';
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer
      className="relative text-white px-6 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/footer-image.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Newsletter Section */}
        <div className="backdrop-blur-[14px] bg-white/5 border border-white/20 rounded-xl p-6 sm:p-10 flex flex-col gap-10 md:flex-row sm:items-center justify-between pl-3">
          <h2 className=" flex-[1]text-xl sm:text-2xl font-semibold mb-4 sm:mb-0 ">
            Join our newsletter to <br className="hidden sm:block" />
            keep up to date with us!
          </h2>
          <form
            className=" flex items-center gap-4 bg-white/5 border border-white/20 rounded-full px-4 py-2  w-full  sm:w-auto "
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Subscribed with:', email);
            }}
          >
            <span className="pl-2 text-white ">🔍</span>
            <Input
              type="email"
              placeholder="please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-sm"
            />
            <Button type="submit"
             >Subscribe</Button>
          </form>
        </div>

        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/logo 1.png" 
                alt="Hymns Village" 
                width={500}
                height={100}
                className="w-10 h-10 rounded-full" 
              />
              <h3 className="text-lg font-semibold">Hymns Village</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hymns Village emerged from a vision to establish a preeminent online destination where
              the rich tapestry of hymnody and insightful theological discourse converge.
            </p>
            <p className="mt-6 text-xs text-gray-400">ALL RIGHT RESERVED 2025</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Navigations</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                    About
                </Link>
                </li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/hymns">Hymns</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
              <li><Link href="/login">Sign up / Log in</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/blog">Blog</a></li>
              <li><a href="/hymns">Hymns</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="/login">Sign up / Log in</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-3">Socials</h4>
            <div className="flex gap-3 text-white text-xl">
              <a href="#"><FaFacebookF className="bg-[#1877f2] rounded-full p-2 w-9 h-9" /></a>
              <a href="#"><FaXTwitter className="bg-[#333] rounded-full p-2 w-9 h-9" /></a>
              <a href="#"><FaYoutube className="bg-[#ff0000] rounded-full p-2 w-9 h-9" /></a>
              <a href="#"><FaLinkedinIn className="bg-[#0a66c2] rounded-full p-2 w-9 h-9" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;