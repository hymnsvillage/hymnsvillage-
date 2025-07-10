'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/api/auth'; 

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        router.replace('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };

    performLogout();
  }, [router]);

  return <p>Logging out...</p>;
}
