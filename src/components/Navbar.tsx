'use client';

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
  // const isActive = (path: string) => pathname === path;
  return (
    <header className="w-full fixed bg-black/10 backdrop-blur-xs shadow-sm text-white px-6 py-4 z-50">
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
              className={`hover-underline ${isActive ? 'active-underline font-semibold' : ''} transition`}
            >
              {link.name}
            </Link>
            );
          })}

          <div className='flex items-center justify-between gap-2 text-white'>
            {/* Login Button */}
            <button className='bg-transparent border border-white text-white'>
              <Link
                href="/login"
                className="capitalize font-semibold"
              >
                Log In
              </Link>
            </button>
            {/* Sign Up button */}
            <button className='hover:border-white'>
              <Link
                href="/signup"
                className="capitalize font-semibold"
              >
                Sign Up
              </Link>
            </button>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Navbar;
