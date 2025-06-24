'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Personal Info', path: '/dashboard/settings/personal-info' },
  { name: 'Email', path: '/dashboard/settings/email' },
  { name: 'Notification', path: '/dashboard/settings/notification' },
  { name: 'Security & Privacy', path: '/dashboard/settings/security' },
];

export default function SettingsMenuSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-6 border-r">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={cn(
                'block px-2 py-1 rounded hover:bg-gray-100',
                pathname === item.path && 'font-semibold text-black'
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
