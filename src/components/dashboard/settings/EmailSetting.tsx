'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export default function EmailSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [currentEmail, setCurrentEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCurrentEmail(user.email ?? '');
      }
    };

    fetchUser();
  }, []);

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess('');

    const { email: newEmail, password } = data;

    // Step 1: Re-authenticate user with password
    const {
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password,
    });

    if (signInError) {
      setError('Incorrect password.');
      return;
    }

    // Step 2: Call backend to request email change
    const response = await fetch('/api/auth/settings/change-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || 'Failed to request email change.');
      return;
    }

    // Step 3: Send verification email to new address
    await fetch('/api/auth/settings/send-verification', {
      method: 'POST',
    });

    setSuccess('Email change requested! Check your inbox for a verification link.');
    reset();
    setCurrentEmail(newEmail);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm w-full p-6 space-y-8">
      {/* Current Email */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-gray-700">{currentEmail}</span>
          <span className="text-sm text-white bg-green-400 px-3 py-1 rounded-md">Verified</span>
        </div>
      </div>

      {/* Change Email Form */}
      <div>
        <h3 className="text-base font-medium mb-3">Change Email Address</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 rounded-xl p-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter new email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-900 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Change Email →'}
          </button>
        </form>
      </div>
    </div>
  );
}
