'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Hymnals', href: '/hymnals' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Change this value (e.g. 50) based on when the background gets lighter
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 px-6 py-4 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white text-black shadow-md'
          : 'bg-black/10 text-white backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hymns Village"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-semibold">Hymns Village</span>
        </Link>

        <MobileMenu />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`hover-underline ${
                  isActive ? 'active-underline font-semibold' : ''
                } transition`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="flex items-center justify-between gap-2">
            {/* Log In Button */}
            <Link
              href="/login"
              className={`hover-underline py-2 px-5 border rounded-full capitalize font-semibold transition ${
                isScrolled ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white'
              }`}
            >
              Log In
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/signup"
              className={`hover-underline py-2 px-5 rounded-full capitalize font-semibold transition ${
                isScrolled
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-white text-black hover:bg-black hover:text-white hover:border-white'
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
