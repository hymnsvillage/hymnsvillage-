'use client';

import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import Link from 'next/link';
import clsx from 'clsx';
import SocialLinks from './SocialLinks';
import { usePathname } from 'next/navigation';


const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Hymnals', href: '/hymnals' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="fixed top-6 right-6 text-white text-2xl md:hidden z-[1100]"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {open ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-[1000] top-16 left-0 w-screen h-screen bg-white text-black transition-transform duration-300 ease-in-out flex flex-col items-center py-10 space-y-6 md:hidden overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Nav Links */}
        <nav className="flex flex-col items-center gap-4 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'w-full text-center py-2 hover:bg-black hover:text-white transition',
                pathname === link.href ? 'bg-black text-white font-semibold' : ''
              )}
              onClick={() => {
                setOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-col items-center gap-3">
          <Link 
            href="/login" 
            className="login-underline text-gray-900 font-medium border px-6 py-2 rounded-full" 
            onClick={() => setOpen(false)}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="hover-underline bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-full"
            onClick={() => setOpen(false)}
          >
            Sign Up
          </Link>
        </div>

        {/* Social Icons */}
        <div className="mt-4">
          <SocialLinks />
        </div>
      </div>
    </>
  );
}

