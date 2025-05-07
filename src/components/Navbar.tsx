'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Hymnals', href: '/hymnals' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-slate-700 text-white px-6 py-4 shadow-sm z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
                 src="/logo 1.png" 
                 alt="Hymns Village" 
                 width={500}
                 height={100}
                  className="w-10 h-10 rounded-full" 
              />
          <span className="text-lg font-semibold">Hymns Village</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative hover:text-white transition"
            >
              <span className="hover-underline text-white">{link.name}</span>
            </Link>
          ))}

          <Link
            href="/login"
            className="px-4 py-2 bg-gray-600 rounded-full hover:bg-gray-500 transition text-white"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl text-white"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4 bg-slate-700 border-t pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-white hover:bg-gray-600 px-3 py-2 rounded transition"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="block w-full text-center bg-gray-600 text-white py-2 rounded-full hover:bg-gray-500 transition"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
