// app/admin/login/page.tsx
'use client';
import AdminLoginForm from '@/components/AdminLoginForm';
import Image from 'next/image';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 m-10">
        
        {/* Left: Admin Login Form */}
        <AdminLoginForm />

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/login.jpg"
            alt="Admin login illustration"
            width={400}
            height={400}
            className="max-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
